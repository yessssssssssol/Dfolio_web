import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import React, { useContext } from "react";
import { UserStateContext, DispatchContext } from "../App";

import "../styles/scss/Header.scss";
import profile from "../img/profile.png";

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

  const pathName = location.pathname;
  const headerId = pathName.substr(1)

  return (
    <Nav activeKey={location.pathname} >
    <header id={headerId}>
      <h1 id="header-logo">Dfolio</h1>
      <div id="header-menu-container">
        <div>
          <span style={{cursor: "pointer"}} onClick={() => navigate("/network")}>NetWork</span>
        </div>
        <div>
          <span style={{cursor: "pointer"}} onClick={() => navigate("/Portfolio")}>MyPortfolio</span>
        </div>
        <div className="header-dropdown-container" id="my-page-img-btn">
          <img id="header-dropdown-btn" src={profile} alt="user icon" />
          {isLogin && (
            <div className="header-dropdown-content">
              <a id="logout-btn" style={{cursor: "pointer"}} onClick={logout}>Logout</a>
              <a id="delete-btn" style={{cursor: "pointer"}} onClick={()=> navigate("/Withdrawal")}>Withdrawal</a>
            </div>
          )}
        </div>
      </div>
    </header>
    </Nav>
  );
}

export default Header;
