import * as React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  overflow: hidden;
  .right {
    display: flex;
    align-items: center;
  }

  .rightlast {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .logo {
    font-size: 1.7rem;
    font-weight: 750;
    letter-spacing: 2px;
    margin-bottom: 1rem;
  }
`;

const NavWrap = styled(Responsive)`
  height: 2rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 1rem;

  .nav {
    border-right: 2px solid;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .navlast {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 11rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
  margin-top: 0.2rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            Relog
          </Link>
          {user ? (
            user.username === 'admin' ? (
              <div>
                <div className="right">
                  <UserInfo>{user.username}</UserInfo>
                  <Button onClick={onLogout}>로그아웃</Button>
                </div>
                <div className="rightlast">
                  <Button to="/admin">관리자 페이지</Button>
                </div>
              </div>
            ) : (
              <div className="right">
                <UserInfo>{user.username}</UserInfo>
                <Button onClick={onLogout}>로그아웃</Button>
              </div>
            )
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
        <NavWrap>
          <Navbar bg="#ffffff" variant="light">
            <Container>
              <Nav className="me-auto">
                <Link className="nav" to="/">
                  포스트
                </Link>
                <Link className="nav" to={'/@admin/'}>
                  공지사항
                </Link>
                <Link className="navlast" to="/home">
                  사이트
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </NavWrap>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
