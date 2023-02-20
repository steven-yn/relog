/****************************************
// Description : Permitted PostListContainer Component
// Vision : V1.1.1
// Filename : PostListContainer.js
// Copyright 2021, Sung Yeon Yoon
// Email: steven_yoon1009@naver.com
* ****************************************/

import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user, permitUserList } = useSelector(
    ({ posts, loading, user, auth }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
      userList: auth.readUser,
      permitUserList: auth.permitUser,
    }),
  );
  useEffect(() => {
    const { username } = match.params;
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search, match.params]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
      permitUserList={permitUserList}
    />
  );
};

export default withRouter(PostListContainer);
