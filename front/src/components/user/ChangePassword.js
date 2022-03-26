import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import swal from 'sweetalert';

import * as Api from "../../api";
import '../../styles/scss/ChangePassword.scss';

const ChangePassword = ( data ) => {
	const navigate = useNavigate();
	const location = useLocation();

  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');
	// db로 보낼 email주소를 임시 비밀번호로 로그인시 넘겨받아서 email변수에 저장.
	const email = location.state.email;
	const currentPassword = location.state.currentPassword;

  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "change-password" 엔드포인트로 post요청함.
      await Api.post("change-password", {
				email,
				password,
				confirmPassword,
				currentPassword,
			});
      swal ( 
        "🔑", 
        "Password successfully updated.", 
        "success" )
      // 로그인 페이지로 이동함.
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("Errrr 비밀번호 재설정 실패\n", err);
    }
  };

  return (
		<div className="change-container">
      <div className="change-left-container">
			  <div className="change-left-wrap">
				  <h1>Dfolio</h1>
				  <p>Discover the world’s top developers</p>
			  </div>
		  </div>
		  <div className="change-right-container">
			  <form className="right-top-wrap">
          <span>Don't have an account?</span>
          <button className="create-account-btn shadow-light" onClick={()=> navigate("/register")}>
            Register
          </button>
        </form>
        <div id="change-right-logo">
          Dfolio
        </div>
				<div id="change-text">
					<h5>Reset your password</h5>
				</div>
			  <div className="change-input-container" onSubmit={handleSubmit}>
          <div>
						<div id="change-password-container">
              <Form.Control
                className="change-input-wrap input-password"
                id="change-input-password"
                placeholder="Password" 
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
								{!isPasswordValid && (
									<p className="text-primary" id="change-text-sucess" style={{ fontSize: "12px", margin:"5px 0 0 0", cursor:"pointer"}}>
										Password is too short (minimum is 4 characters)
									</p>
								)}
            </div>
						<div id="change-confirm-password-container">
							<Form.Control
                className="change-input-wrap input-password input-confirm-password"
                id="change-input-confirm-password"
                placeholder="Confirm Password" 
                type="password"
                autoComplete="on"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              	{!isPasswordSame && (
									<p className="text-primary" id="change-text-sucess" style={{ fontSize: "12px", margin:"5px 0 0 0"}}>
										Passwords dose not match.
									</p>
								)}
						</div>
          </div>
          <form className="change-btn-wrap">
            <button className="change-btn" type="submit" disabled={!isPasswordValid}>Send</button>
          </form>
			  </div>
        <p 
					id="change-login-page-lending"
          style={{cursor:"pointer"}}
					onClick={()=> navigate("/login")}
				>
					Forgot password?
				</p>
      </div>
	</div>
  );
}

export default ChangePassword;