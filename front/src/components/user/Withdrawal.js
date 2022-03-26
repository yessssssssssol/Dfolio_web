import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import swal from "sweetalert";

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import { UserStateContext } from "../../App";
// import confirmModal from "./ConfirmWithdrawal";
import "../../styles/scss/Withdrawal.scss";

function Withdrawal() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const userState = useContext(UserStateContext);

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
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value;

    await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((isConfirm) => {
      if (isConfirm.value === true) {
        value = true;
      } else if (isConfirm.dismiss === "cancel") {
        value = false;
      }
    })
    try {
      if (value === true) {
        await Api.post(`withdrawal/${userState.user.id}`, {
          email,
          password,
        });
        swal("Your account has been deleted.", "Thank you for using Dfolio!", {
          icon: "success",
        });
        dispatch({ type: "LOGOUT" });
        navigate("/login");
        sessionStorage.removeItem("userToken");
      } else if (value === false) {
        swal("Your membership cancellation request has been cancelled.", {
          icon: "error"
        });
        navigate("/");
      }
    } catch (err) {
      swal("Failed to cancel membership.", "Please check your email or password", {
        icon: "warning"
      });
    }
  };

  return (
    <div className="withdrawal-container">
      <div className="withdrawal-left-container">
        <div className="withdrawal-left-wrap">
          <h1>Dfolio</h1>
          <p>Discover the world’s top developers</p>
        </div>
      </div>
      <div className="withdrawal-right-container">
        <div id="withdrawal-right-logo">Dfolio</div>
        <div id="withdrawal-text">
          <h5>Are you sure leave the Dfolio?</h5>
          <p>
            Enter the email address you used when you joined.
            <br />
          </p>
        </div>
        <div className="withdrawal-input-container" onSubmit={handleSubmit}>
          <div>
            <div id="withdrawal-eamil-container">
              <Form.Control
                className="withdrawal-input-wrap input-id"
                id="withdrawal-input-id"
                placeholder="Email"
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <p
                  className="text-primary"
                  style={{ fontSize: "12px", margin: "5px 0 0 0" }}
                >
                  Email is invalid.
                </p>
              )}
            </div>
          </div>
          <div>
            <div id="withdrawal-password-container">
              <Form.Control
                className="withdrawal-input-wrap input-password"
                id="withdrawal-input-password"
                placeholder="Password"
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <p
                  className="text-primary"
                  style={{ fontSize: "12px", margin: "5px 0 0 0" }}
                >
                  Password is too short (minimum is 4 characters)
                </p>
              )}
            </div>
          </div>
          <form className="withdrawal-btn-wrap">
            <button
              className="withdrawal-btn-back"
              type="submit"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              className="withdrawal-btn-delete"
              type="submit"
              disabled={!isFormValid}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;
