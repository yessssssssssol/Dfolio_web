import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";
// import Certificate from "./Certificate";
// import CertificateAddForm from "./CertificateAddForm";
import Certificate from "./Certificate";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
}) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(
    currentCertificate.description
  );

  const [whenDate, setWhenDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentCertificate의 user_id를 user_id 변수에 할당함.
    const userId = currentCertificate.userId;

    // "certificates/자격증 id" 엔드포인트로 PUT 요청함.
    await Api.put(`certificates/${currentCertificate.id}`, {
      userId,
      title,
      description,
      whenDate,
    });

    // "certificatelist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", userId);
    // certificates를 response의 data로 세팅함.
    setCertificates(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="Certificate"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="Certificate Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row}>
        <Col xs="auto">
          <DatePicker
            selected={whenDate}
            onChange={(date) => setWhenDate(date)}
          />
        </Col>
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

export default CertificateEditForm;
