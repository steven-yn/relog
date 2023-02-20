/****************************************
// Description : Admin UI Component
// Vision : V1.1.1
// Filename : ReqList.js
// Copyright 2021, Sung Yeon Yoon
// Email: steven_yoon1009@naver.com
* ****************************************/

import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import { useEffect } from 'react';
import { useState } from 'react';
// import palette from '../../lib/styles/palette';
// import SubInfo from '../common/SubInfo';

const UserTable = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  h2 {
    margin-top: 2rem;
  }
`;

const UserList = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 50%;
`;

const RequestPermitButton = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  width: 50%;
`;

const ReqListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const ReqItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 100%;
  border-bottom: 2px solid;
`;

/*
const ReqItem = ({ users }) => {
  const { user } = users;
  return (
    <ReqItemBlock>
      <SubInfo username={user.username} userid={user._id} />
    </ReqItemBlock>
  );
};
*/

const UserItem = ({ userList, onPermit, permitUserList }) => {
  const [permit, setPermit] = useState(false);
  const onClick = () => {
    onPermit(userList.username);
  };

  const checkPermit = permitUserList.find(
    (rtrn) => rtrn.username === userList.username,
  );
  //
  useEffect(() => {
    checkPermit ? setPermit(true) : setPermit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClick]);

  return (
    <ReqItemBlock>
      <UserList>
        유저이름 : {userList.username}
        <br />
        아이디 : {userList._id}
        <br />
      </UserList>
      <RequestPermitButton>
        <Button onClick={onClick} cyan>
          {permit ? '승인됨' : '승인대기중'}
        </Button>
      </RequestPermitButton>
    </ReqItemBlock>
  );
};

const ReqList = ({ readUser, onPermit, permitUserList }) => {
  return (
    <ReqListBlock>
      <UserTable>
        <h2>유저정보</h2>
      </UserTable>

      {readUser[0]?.username &&
      permitUserList[permitUserList.length - 1]?.username &&
      'admin' ? (
        <div>
          {readUser.map((userList) => (
            <UserItem
              key={userList._id}
              userList={userList}
              onPermit={onPermit}
              permitUserList={permitUserList}
            />
          ))}
        </div>
      ) : (
        <h1> 유저항목을 불러오지 못했습니다. </h1>
      )}
    </ReqListBlock>
  );
};

export default ReqList;
