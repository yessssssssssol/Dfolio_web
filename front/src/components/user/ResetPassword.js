import React, { useState, useContext } from "react";
import '../../styles/scss/ResetPassword.scss';
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext } from "../../App";

const ResetPassword = () => {
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
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

	return (
		<div className="reset-container">
      <div className="reset-left-container">
			  <div className="reset-left-wrap">
				  <h1>Dfolio</h1>
				  <p>Discover the world’s top developers</p>
			  </div>
		  </div>
		  <div className="reset-right-container">
			  <form className="right-top-wrap">
          <span>Don't have an account?</span>
          <button className="create-account-btn shadow-light" onClick={()=> navigate("/register")}>
            Register
          </button>
        </form>
        <div id="rigth-logo">
          Dfolio
        </div>
				<div id="reset-text">
							<h4>Forgot Password?</h4>
							<p>
							Enter the email address you used when you joined and we’ll send you instructions to reset your password.
								<br />
								<br />
								For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
							</p>
						</div>
			  <div className="reset-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="eamil-container">
              <Form.Control
                className="reset-input-wrap input-id"
                id="input-id"
                placeholder="Email" 
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <form className="reset-btn-wrap">
            <button className="reset-btn" type="submit" disabled={!isFormValid}>Send</button>
          </form>
			  </div>
      </div>
	</div>
	)
}
export default ResetPassword;
