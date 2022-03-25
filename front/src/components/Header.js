import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";

import '../styles/scss/Header.scss';
import profile from '../img/profile.png'

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
<<<<<<< HEAD
    <Nav activeKey={location.pathname}>
      <Nav.Item className="me-auto mb-5">
        <Nav.Link disabled>
          🤡 Hello, it's a page for CRAZY DEVELOPERS 🤡
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/Portfolio")}>My page</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate("/network")}>Network</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav.Item>
      )}
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/Withdrawal")}>탈퇴하기</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
=======
    <header activeKey={location.pathname}>
      <h1 id="header-logo">Dfolio</h1>
      <nav id="header-menu-container">
        <div>
          <span onClick={()=> navigate("/network")}>NetWork</span>
        </div>
        <div>
          <span onClick={()=> navigate("/Portfolio")}>MyPortfolio</span>
        </div>
        <div class="header-dropdown-container" id="my-page-img">
          <img id="header-dropdown-btn" src={profile} alt='user icon'/>
          { isLogin && (
          <div class="header-dropdown-content">
            <div id="logout-btn" onClick={logout}>Logout</div>
            <div id="delete-btn" onClick={()=> navigate("/Withdrawal")}>Withdrawal</div>
          </div>
          )}
        </div>
      </nav>
    </header>
>>>>>>> origin/dev
  );
}

export default Header;
