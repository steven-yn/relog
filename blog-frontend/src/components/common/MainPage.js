import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MainPages = styled.div`
.bg{
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 10%,
        rgba(20, 20, 20, 0.7) 70%,
        rgba(20, 20, 20, 1)
      ),
      url(https://source.unsplash.com/random/1920x1080);
    background-size: cover;
    z-index: 3;
  }
  .total{
    display: flex;
    align-items:center;
    justify-content: center;
    height: 100vh;
  }
  .menu{
    list-style:none;
    text-align: center;
    color: white;
    -webkit-text-stroke: 1px black;
    font-size: 1.5rem;
    border: 1px solid #f5f5f5;
    width: 16rem;
    height: 6rem;
    padding: 2rem;
    margin: 3rem;
    z-index: 4;
  }
`;

export const MainPage = () => {
  return(
    <>
      <MainPages>
        <div className = "bg">
          <ol className = "total">
            <li className = "menu"><Link to =  "/">포스트</Link></li>
            <li className = "menu"><Link to = '/@admin/'>공지사항</Link></li>
            <li className = "menu"><Link to =  "/home">사이트</Link></li>
          </ol>
        </div>
      </MainPages>
    </>
  )
};
