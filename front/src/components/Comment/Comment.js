import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

// import * as Api from "../../api";

// import CommentCard from "./CommentCard";

function Comment({ comment, setComments, portfolioOwnerId }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;

    // "comment/create" 엔드포인트로 post요청함.
    const res = await Api.post("comment/create", {
      hostId: portfolioOwnerId,
      content,
    });
    setContent(res.data.content);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="Comment Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            Save
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default Comment;
