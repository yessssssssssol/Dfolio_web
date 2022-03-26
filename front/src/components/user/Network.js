import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import * as Api from "../../api";
import UserCard from "./UserCard";

import { UserStateContext } from "../../App";
import '../../styles/scss/Network.scss';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("updatedAt");
  const sort = [
    { name: "Recently", value: "updatedAt" },
    { name: "Like", value: "likeCount" },
  ];
  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }

    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist", sortBy).then((res) => setUsers(res.data));

  }, [userState]);

  const handelClickSortBtn = (e, value) => {
    setSortBy(value);
    Api.get("userlist", value).then((res) => setUsers(res.data));
  };


  return (
    <>
      <ButtonGroup id="network-toggle-btn-group">
        {sort.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-secondary"
            name="radio"
            checked={sortBy === radio.value}
            onClick={(e) => handelClickSortBtn(e, radio.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <div 
        className="userlist-container"
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isNetwork
            setUsers={setUsers}
            users={users}
          />
        ))}
      </div>
    </>
  );
}
export default Network;
