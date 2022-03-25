import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { DispatchContext } from "../../App";

import * as Api from "../../api";
import { KAKAO_AUTH_URL } from "./OAuth";
import '../../styles/scss/LoginForm.scss';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });

      const emailData = res.data.email; // navigate 할 때, state: emailData를 사용하여 emailData를 함께 보내주고자 함
      const currentPassword = res.data.password; // passwordRouter 에서 필요하여 일단 보내보려고 함.


      if(res.data.passwordReset === true) {
        navigate("/change-password", { 
          state: {
            email: emailData,
            currentPassword: currentPassword
          },
          replace: true
        });
      } else if ((res.data.passwordReset === false) || (res.data.passwordReset === null)) {
        // 유저 정보는 response의 data임.
        const user = res.data;
        // JWT 토큰은 유저 정보의 token임.
        const jwtToken = user.token;
        // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
        sessionStorage.setItem("userToken", jwtToken);
        // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
        // 기본 페이지로 이동함.
        navigate("/", { replace: true });
      }
  
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };
  return (
    <div className="login-container">
      <div className="login-left-container">
        <div className="login-left-wrap">
          <h1>Dfolio</h1>
          <p>Discover the world’s top developers</p>
        </div>
      </div>
		  <div className="login-right-container">
			  <form className="right-top-wrap">
          <span>Don't have an account?</span>
          <button className="create-account-btn shadow-light" onClick={()=> navigate("/register")}
            >
            Register
          </button>
        </form>
        <div id="login-right-logo">
          Dfolio
        </div>
			  <div className="login-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="login-eamil-container">
              <Form.Control
                className="login-input-wrap input-id"
                id="login-input-id"
                placeholder="Email" 
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <p className="text-primary" style={{ fontSize: "12px", margin:"5px 0 0 0" }}>
                  Email is invalid.
                </p>
                )}
            </div>
          </div>
          <div>
            <div id="login-password-container">
              <Form.Control
                className="login-input-wrap input-password"
                id="login-input-password"
                placeholder="Password" 
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
<<<<<<< HEAD
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  Log In
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </Col>
            </Form.Group>
          </Form>
          <div
            style={{
              fontSize: 13,
              textAlign: "center",
              marginTop: 40,
              color: "gray",
            }}
          >
            --------------------- SNS 간편 로그인 ---------------------
          </div>
          <div className="snsLoginContainer">
            <div style={{ textAlign: "center" }}>
              <img
                className="naverLogo"
                src="img/naver.png"
                alt="naver 간편 로그인 로고"
                style={{
                  width: "50px",
                  margin: "25px 20px",
                }}
              />

              <a href={KAKAO_AUTH_URL}>
                <img
                  className="kakaoLogo"
                  src="img/kakao.png"
                  alt="kakao 간편 로그인 로고"
                  style={{ width: "50px", margin: "25px 20px" }}
                ></img>
              </a>

              <img
                className="facebookLogo"
                src="img/facebook.png"
                alt="facebook 간편 로그인 로고"
                style={{
                  width: "50px",
                  margin: "25px 20px",
                }}
              />
              <img
                className="appleLogo"
                src="img/apple.png"
                alt="apple 간편 로그인 로고"
                style={{
                  width: "50px",
                  margin: "25px 20px",
                }}
              />
=======
                {!isPasswordValid && (
                <p className="text-primary" style={{ fontSize: "12px", margin:"5px 0 0 0"}}>
                  Password is too short (minimum is 4 characters)
                </p>
                )}
>>>>>>> origin/dev
            </div>
            <p 
							className="password-find"
							style={{ fontSize: "12px", color: "gray", textAlign: "right"}}
							onClick={()=> navigate("/reset-password")}
						>
							Forgot password?
						</p>
          </div>
          <form className="login-btn-wrap">
            <button className="login-btn" type="submit" disabled={!isFormValid}>Login</button>
          </form>
			  </div>
      </div>
	</div>
  );
}
export default LoginForm;