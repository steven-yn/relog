import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();

  // Quill 에디터 의 값이 바뀔때 스토어에 값을 넣는 작업.
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  // Editor 컴포넌트의 useEffect 를 위한 함수
  // 컴포넌트가 화면에 나타났을때 한번만 실행되도록 함.
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
