/****************************************
// Description : Admin RestAPI <=> axios
// Vision : V1.0.0
// Filename : auth.js
// Copyright 2021, Sung Yeon Yoon
// Email: steven_yoon1009@naver.com
* ****************************************/

import client from './client';

// 로그인
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

// 회원가입
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');

export const readUser = () => client.get('/api/auth/readUser');
