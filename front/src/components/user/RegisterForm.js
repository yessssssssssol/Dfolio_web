import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import * as Api from '../../api';
import "../../styles/scss/RegisterForm.scss";

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');
  //useState로 name 상태를 생성함.
  const [name, setName] = useState('');

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = email => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post('user/register', {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate('/login');
    } catch (err) {
      console.log('회원가입에 실패하였습니다.', err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left-container">
        <div className="register-left-wrap">
          <h1>Dfolio</h1>
          <p>Discover the world’s top developers</p>
        </div>
      </div>
		  <div className="register-right-container">
			  <form className="right-top-wrap">
          <span>Already a member?</span>
          <button className="create-account-btn shadow-light" onClick={()=> navigate("/login")}
            >
            Login
          </button>
        </form>
        <div id="register-right-logo">
          Dfolio
        </div>
			  <div className="register-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="register-eamil-container">
              <Form.Control
                className="register-input-wrap input-id"
                id="register-input-id"
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
            <div id="register-password-container">
              <Form.Control
                className="register-input-wrap input-password"
                id="register-input-password"
                placeholder="Password" 
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                {!isPasswordValid && (
                <p className="text-primary" style={{ fontSize: "12px", margin:"5px 0 0 0"}}>
                  Password is too short (minimum is 4 characters)
                </p>
                )}
            </div>
            <div id="register-confirm-password-container">
							<Form.Control
                className="register-input-wrap input-password input-confirm-password"
                id="register-input-confirm-password"
                placeholder="Confirm Password" 
                type="password"
                autoComplete="on"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
						</div>
            <div id="register-name-container">
							<Form.Control
                className="register-input-name input-name"
                id="register-input-name"
                placeholder="Name" 
                type="text"
                autoComplete="on"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
								{!isNameValid && (
									<p className="text-primary" id="change-text-sucess" style={{ fontSize: "12px", margin:"5px 0 0 0"}}>
										Name is too short (minimum is 2 characters)
									</p>
								)}
						</div>
          </div>
          <form className="register-btn-wrap">
            <button className="register-btn" type="submit" disabled={!isFormValid}>Register</button>
          </form>
			  </div>
      </div>
	  </div>
  );
}

export default RegisterForm;
