import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
// import Education from "./Education";
// import EducationAddForm from "./EducationAddForm";
// import Education from "./Education";

function EducationEditForm({
  currentEducation,
  setEducations,
  setIsEditing,
}) {
  //useState로 school 상태를 생성함.
  const [school, setSchool] = useState(currentEducation.school);
  //useState로 school 상태를 생성함.
  const [major, setMajor] = useState(currentEducation.major);
  //useState로 school 상태를 생성함.
  const [position, setPosition] = useState(currentEducation.position);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentEducation의 user_id를 user_id 변수에 할당함.
    const userId = currentEducation.userId;

    // "Educations/자격증 id" 엔드포인트로 PUT 요청함.
    await Api.put(`educations/${currentEducation.id}`, {
      userId,
      school,
      major,
      position,
    });

    // "Educationlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("educationlist", userId);
    // Educations를 response의 data로 세팅함.
    setEducations(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
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
      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="현재 상태 체크박스로 구현 필요"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
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
  );
}

export default EducationEditForm;
