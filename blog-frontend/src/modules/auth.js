/****************************************
// Description : Admin Redux Component
// Vision : V1.1.1
// Filename : auth.js
// Copyright 2021, Sung Yeon Yoon
// Email: steven_yoon1009@naver.com
* ****************************************/

import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

const [READ_USER, READ_USER_SUCCESS, READ_USER_FAILURE] =
  createRequestActionTypes('auth/READ_USER');

const [PERMIT_USER] = createRequestActionTypes('auth/PERMIT_USER');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register / login
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));
export const readUser = createAction(READ_USER);
export const permitUser = createAction(PERMIT_USER, (permitted) => ({
  username: permitted,
}));

// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const readUserSaga = createRequestSaga(READ_USER, authAPI.readUser);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(READ_USER, readUserSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
  readUser: {
    userList: null,
    error: null,
  },
  permitUser: [
    {
      username: 'admin',
    },
  ],
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [READ_USER_SUCCESS]: (state, { payload: readUser }) => ({
      ...state,
      readUser,
    }),
    [READ_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [PERMIT_USER]: (state, { payload: permitUser }) =>
      produce(state, (draft) => {
        draft.permitUser.push(permitUser);
      }),
  },
  initialState,
);

export default auth;
