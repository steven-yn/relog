/****************************************
// Description : Admin Container Component
// Vision : V1.1.1
// Filename : ReqListContainer.js
// Copyright 2021, Sung Yeon Yoon
// Email: steven_yoon1009@naver.com
* ****************************************/

import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { readUser, permitUser } from '../../modules/auth';
import ReqList from '../../components/admin/ReqList';
import { useEffect } from 'react';

const ReqListContainer = () => {
  const dispatch = useDispatch();
  const { userList, loading, permitUserList } = useSelector(
    ({ auth, loading }) => ({
      userList: auth.readUser,
      loading: loading['auth/READ_USER'],
      permitUserList: auth.permitUser,
    }),
  );

  const onPermit = (permitted) => {
    dispatch(permitUser(permitted));
  };

  // 처음 마운트될 때 포스트 읽기 API 요청
  useEffect(() => {
    dispatch(readUser());
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기

    return;
  }, [dispatch]);

  return (
    <ReqList
      loading={loading}
      readUser={userList}
      onPermit={onPermit}
      permitUserList={permitUserList}
    />
  );
};

export default withRouter(ReqListContainer);

/*
  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

   () => {
      dispatch(unloadPost());
    };
*/
