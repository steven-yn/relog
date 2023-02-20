import Post from '../../models/post';
import mongooose from 'mongoose';
import Joi from '../../../node_modules/joi/lib/index';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongooose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }

  try {
    const post = await Post.findById(id);

    // 포스트가 존재하지 않을때
    if (!post) {
      ctx.status = 404;
      return;
    }

    // 존재하면 포스트를 가져오고 다음으로 넘어간다.
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;

  // 포스트에 등록된 user id가 로그인 중인 user 의 id 인지 확인
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*
POST /api/posts
{
    "title": "제목",
    "body": "내용",
    "tags": ["태그1", "태그2"]
}
*/

export const write = async (ctx) => {
  // 전달받은 요청내용 검증
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증.
    title: Joi.string().required(), // required 가 있으면 필수항목.
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열.
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리.
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  // write API
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/*
    GET /api/posts?Username=&tag=&page=
*/

export const list = async (ctx) => {
  // query 는 문자열이기 때문에 숫자로 변환해 줘야함.
  // 값이 주어지지 않았다면 1을 기본으로 사용.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;

  // tag,username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 빈배열.
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 }) // 포스트 역순 불러오기 (last 포스트)
      .limit(10) // 보이는 개수제한
      .skip((page - 1) * 10) // 페이지 기능 구현.
      .lean() // DB 문서 인스턴스를 JSON 으로 변환
      .exec();

    // 마지막 페이지 알림기능 구현.
    // 커스텀 헤더를 설정.
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    // 내용 길이 200자 제한기능 구현.
    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id
*/
export const read = (ctx) => {
  ctx.body = ctx.state.post;
};

/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하긴 했지만 응답할 데이터는 없음.)
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.params;

  // 전달받은 요청내용 검증
  // write 에서 사용한 schema 와 비슷한데, required()가 없다.
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증.
    title: Joi.string(), // required 가 있으면 필수항목.
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()), // 문자열로 이루어진 배열.
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리.
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; // 객체를 복사

  // body 값이 주어졌다면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  // update API

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이값을 설정하면 업데이트된 데이터를 반환.
      // false 일땐 업데이트 되기 전의 데이터를 반환.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
