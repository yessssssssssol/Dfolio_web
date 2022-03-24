import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useContext } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

function UserCard({ user, users, setIsEditing, isEditable, isNetwork, setUser, setUsers }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const handleButtonClick = async (e) => {
    e.stopPropagation();

    const res = await Api.put(`like/${userState.user.id}`, {
      otherUserId: user.id,
    });
    const updatedUser = res.data;    

    if (isNetwork) {
      const newUsers = users.map((user) => {
        if (user.id === updatedUser.id) {
          return {
            ...user,
            likeCount: updatedUser.likeCount
          }
        }
        return user;
      })
      setUsers(newUsers);
    } else {
      setUser(user);
    }
    
  };
  // const { likeCount } = await api.post();
  // setLike(likeCount);
  return (
    <Card
      className="mb-2 ms-3 mr-5"
      style={{ width: "18rem" }}
      // className="mb-2 ms-3 mr-5"
      // border="light"
      // style={{ width: "18rem" }}
      // onClick={() => navigate(`/users/${user.id}`)}
    >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem", borderRadius: "70%" }}
            className="mb-3"
            src={user?.image ? user?.image : "http://placekitten.com/200/200"}
            alt="사용자 프로필 이미지입니다."
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {user?.email}
          <a href={user?.profilelink}>
            <Card.Img
              style={{ width: "1rem", height: "1rem", marginLeft: 10 }}
              className="mb-2"
              src="img/link.png"
              alt="하이퍼링크 아이콘"
            ></Card.Img>
          </a>
        </Card.Subtitle>

        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <Button variant="outline-light">Portfolio</Button>
          </Card.Link>
        )}
      </Card.Body>

      <Card.Footer className="mt-3 text-center">
        <Button
          variant="outline-warning"
          type="submit"
          onClick={handleButtonClick}
        >
          LIKE 👍 {user?.likeCount}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default UserCard;
