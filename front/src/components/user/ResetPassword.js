import React, { useState } from "react";
import '../../styles/scss/ResetPassword.scss';
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import swal from 'sweetalert';

import * as Api from "../../api";

const ResetPassword = () => {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "reset-password" 엔드포인트로 post요청함.
      await Api.post("reset-password", {email});
      swal ( 
        "💌", 
        "If this email address was used to create an account, instructions to reset your password will be sent to you. Please check your email.", 
        "info" )
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
        <div id="reset-right-logo">
          Dfolio
        </div>
				<div id="reset-text">
          <h5>Forgot Password?</h5>
          <p>
          Enter the email address you used when you joined and we’ll send you instructions to reset your password.
            <br />
            <br />
            For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
          </p>
        </div>
			  <div className="reset-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="reset-eamil-container">
              <Form.Control
                className="reset-input-wrap input-id"
                id="reset-input-id"
                placeholder="Email" 
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
							{!isEmailValid && (
                <p className="text-success" style={{ fontSize: "12px", margin:"5px 0 0 0" }}>
                  이메일 형식이 올바르지 않습니다.
                </p>
              )}
            </div>
          </div>

          <form className="reset-btn-wrap">
            <button className="reset-btn" type="submit" disabled={!isEmailValid}>Send</button>
          </form>
			  </div>
      </div>
	</div>
	)
}
export default ResetPassword;
