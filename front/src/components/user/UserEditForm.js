import React, { useState, useRef } from "react";
import { Button, Form, Card, Col, Row, Spinner } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  // useState로 image 상태를 생성함.
  const [image, setImage] = useState({
    imageFile: "",
    previewUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  // useState로 image loaded상태를 생성함.
  const [loaded, setLoaded] = useState(false);

  console.log(setImage)

  // useRef 함수로 current 속성을 가지고 있는 객체 반환 재랜더링 하지 않기 위해 사용
  const fileInput = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const imageOnChange = (e) => {
     e.preventDefault();
    const fileReader = new FileReader();

    console.log(e.target.files[0])
    
    if(e.target.files[0]){
      setLoaded("loading")
      fileReader.readAsDataURL(e.target.files[0])
    }

    fileReader.onload = () => {
      setImage(
        {
          imageFile: e.target.files[0],
          previewUrl: fileReader.result
        }
      )
      setLoaded(true);
    }
  }

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <div className="justify-content-md-center row">
              <img 
                className="card-img mb-3"
                src={image.previewUrl}
                style={{ width: "10rem", height: "8rem", borderRadius:"70%"}}
              />
          </div>
          <input 
            type="file" 
            name="imageFile"
            accept="image/*"
            // style={{ display: "none" }}
            ref={fileInput}
            onClick={() => fileInput.current.click()}
            onChange={imageOnChange}
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
    </Card>
  );
}

export default UserEditForm;
