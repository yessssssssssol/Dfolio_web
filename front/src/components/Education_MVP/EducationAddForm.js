import React, { useState } from "react";
import { Button, Form, Col, Row, FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  //school로 description 상태를 생성함.
  const [school, setSchool] = useState("");
  //major로 description 상태를 생성함.
  const [major, setMajor] = useState("");
  //position로 description 상태를 생성함.
  const [position, setPosition] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  // useState로 toDate 상태를 생성함.
  const [toDate, setToDate] = useState(new Date());


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;
    // "Education/create" 엔드포인트로 post요청함.

    // console.log(position);
    // console.log(typeof position);

    await Api.post("education/create", {
      userId: portfolioOwnerId,
      school,
      major,
      position,
      fromDate,
      toDate,
    });
    // "Educationlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educationlist", userId);
    // Educations를 response의 data로 세팅함.
    setEducations(res.data);
    // Education를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  const handleNameChange = React.useCallback((e) => {
    const target = e.currentTarget;
    setSchool(target.value);
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <FormGroup as={Row}>
        <Col xs="auto">
          <DatePicker
            selected={fromDate}
            // dateFormat="yyyy년 MM월 dd일"
            onChange={(date) => setFromDate(date)}
          />
        </Col>
        <Col xs="auto">
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </Col>
      </FormGroup>

      <Form.Group>
        <div key={`inline-radio`} className="mb-3 mt-3">
          <Form.Check
            inline
            label="재학중"
            id="radio1"
            type="radio"
            name="position"
            value="재학중"
            checked={position === "재학중"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label="학사졸업"
            id="radio2"
            type="radio"
            name="position"
            value="학사졸업"
            checked={position === "학사졸업"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label="석사졸업"
            id="radio3"
            type="radio"
            name="position"
            value="석사졸업"
            checked={position === "석사졸업"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label="박사졸업"
            id="radio4"
            type="radio"
            name="position"
            value="박사졸업"
            checked={position === "박사졸업"}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
      </Form.Group>
      

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
export default EducationAddForm;
