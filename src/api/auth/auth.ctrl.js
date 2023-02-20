import Joi from '../../../node_modules/joi/lib/index';
import User from '../../models/user';

/*
POST /api/auth/register
{
  "username": "testuser",
  "password": "1234"
}
*/

// 회원가입
export const register = async (ctx) => {
  // Request Body 검증.
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // username 이 이미 존재하는지 검사.
  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Confilct
      return;
    }

    const user = new User({
      username,
    });

    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // DB에 저장

    // 응답할 데이터에서 hashedPassword 필드 제거
    ctx.body = user.serialize();

    // 쿠키로 token 발급
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
POST /api/auth/login
{
  "username": "testuser",
  "password": "1234"
}
*/

// 로그인
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  // 입력된 username, password 가 없으면 에러처리.
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    // 계정이 존재하지 않으면 에러처리.
    const user = await User.findByUsername(username);

    if (!user) {
      ctx.status = 401;
      return;
    }

    // 잘못된 비밀번호
    const valid = await user.checkPassword(password);

    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    // 쿠키로 token 발급
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/auth/check
*/

// 로그인 상태 확인
export const check = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    // 로그인 중 아님.
    ctx.state = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
POST /api/auth/logout
*/

// 로그아웃
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};

/****************************************
// Description : Admin RestAPI
// Vision : V1.0.0
// Filename : auth.ctrl.js
// Copyright 2021, Sung Yeon Yoon
// Email: testuser_yoon1009@naver.com
* ****************************************/

/*
GET /api/auth/readUser
*/

// 유저 목록 가지고오기.
export const readUser = async (ctx) => {
  try {
    const userList = await User.find();
    ctx.body = userList;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
POST /api/auth/permitUser
*/

// 가입 승인하기.

/*
export const permitUser = async (ctx) => {
  try {
    const
  } catch (e) {
    ctx.thre
  }
}
*/
