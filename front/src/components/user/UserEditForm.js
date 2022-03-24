import React, { useState, useRef } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import LikeButton from "./LikeButton";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.

  const [description, setDescription] = useState(user.description);
  //useState로 profilelink 상태를 생성함.
  const [profilelink, setProfilelink] = useState(user.profilelink);

  const [image, setImage] = useState(user.image);
  // useRef 함수로 current 속성을 가지고 있는 객체 반환 재랜더링 하지 않기 위해 사용
  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      profilelink,
      image,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const onChange = (e) => {
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // readyState === 2 -> DONE 작업 완료
        setImage(reader.result);
        console.log(reader.result);
      } else {
        //업로드 취소/실패할 시
        setImage("http://placekitten.com/200/200");
        return;
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <div className="justify-content-md-center row">
            <img
              className="card-img mb-3"
              src={image}
              style={{ width: "10rem", height: "8rem", borderRadius: "70%" }}
              onClick={() => {
                fileInput.current.click();
              }}
            />
          </div>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            // style={{ display: "none" }}
            ref={fileInput}
            onChange={onChange}
          />
          <br />
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditProfilelink">
            <Form.Control
              type="text"
              placeholder="깃 주소"
              value={profilelink}
              onChange={(e) => setProfilelink(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
      <LikeButton />
    </Card>
  );
}

export default UserEditForm;
