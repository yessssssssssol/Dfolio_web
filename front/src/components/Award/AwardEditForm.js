import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentAward.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentAward.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentAward의 user_id를 user_id 변수에 할당함.
    const userId = currentAward.userId;

    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`awards/${currentAward.id}`, {
      userId,
      title,
      description,
    });

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("awardlist", userId);
    // awards를 response의 data로 세팅함.
    setAwards(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="Award Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="Award Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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

export default AwardEditForm;