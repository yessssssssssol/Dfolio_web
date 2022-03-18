import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({
  portfolioOwnerId,
  setEducations,
  setIsAdding,
}) {
  //school로 description 상태를 생성함.
  const [school, setSchool] = useState('');
  //major로 description 상태를 생성함.
  const [major, setMajor] = useState('');
  //position로 description 상태를 생성함.
  const [position, setPosition] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;
    
    // "Education/create" 엔드포인트로 post요청함.
    await Api.post("education/create", {
      userId: portfolioOwnerId,
      school,
      major,
      position,
    });

    // "Educationlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educationlist", userId);
    // Educations를 response의 data로 세팅함.
    setEducations(res.data);
    // Education를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="현재 상태 체크박스로 구현 필요"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
