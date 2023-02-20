/****************************************
// Description : Admin Page Routing
// Vision : V1.0.0
// Filename : Adminpage.js
// Copyright 2021, Sung Yeon Yoon
// Email: steven_yoon1009@naver.com
* ****************************************/

import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ReqListContainer from '../containers/admin/ReqListContainer';

const AdminPage = () => {
  return (
    <>
      <HeaderContainer />
      <ReqListContainer />
    </>
  );
};

export default AdminPage;
