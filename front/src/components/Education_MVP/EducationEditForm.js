import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  //useState로 school 상태를 생성함.
  const [school, setSchool] = useState(currentEducation.school);
  const [major, setMajor] = useState(currentEducation.major);
  const [position, setPosition] = useState(currentEducation.position);
  const [fromDate, setFromDate] = useState(new Date(currentEducation.fromDate));
  const [toDate, setToDate] = useState(new Date(currentEducation.toDate));

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
      fromDate,
      toDate,
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
          placeholder="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} style={{ padding: "0 5px !important" }}>
        <Col style={{ fontSize: "13px", color: "#777777" }}>
          Period(from/to)
        </Col>
        <Col>
          <DatePicker
            selected={fromDate}
            dateFormat="yyyy년 MM월 dd일"
            onChange={(date) => setFromDate(date)}
          />
        </Col>
        <Col>
          <DatePicker
            selected={toDate}
            dateFormat="yyyy년 MM월 dd일"
            onChange={(date) => setToDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group style={{ fontSize: "15px", color: "#777777" }}>
        <div key={`inline-radio`} className="mb-3 mt-3">
          <Form.Check
            inline
            label="Degree expected"
            id="radio1"
            type="radio"
            name="position"
            value="Degree expected"
            checked={position === "Degree expected"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label="Bachelor's Degree"
            id="radio2"
            type="radio"
            name="position"
            value="Bachelor's Degree"
            checked={position === "Bachelor's Degree"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label="Master's Degree"
            id="radio3"
            type="radio"
            name="position"
            value="Master's Degree"
            checked={position === "Master's Degree"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label="Doctorate Degree"
            id="radio4"
            type="radio"
            name="position"
            value="Doctorate Degree"
            checked={position === "Doctorate Degree"}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
export default EducationEditForm;
