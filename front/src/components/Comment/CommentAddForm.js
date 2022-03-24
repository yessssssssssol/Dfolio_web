import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

import * as Api from "../../api";

function CommentAddForm({ portfolioOwnerId, setComments, setIsAdding }) {
  //useState로 title 상태를 생성함.

  //useState로 description 상태를 생성함.
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;

    // "comment/create" 엔드포인트로 post요청함.
    await Api.post("comment/create", {
      userId: portfolioOwnerId,
      content,
    });

    // "commentlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("commentlist", userId);
    // comments를 response의 data로 세팅함.
    setComments(res.data);
    // Comment를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* //   <Form.Group controlId="formBasicDescription" className="mt-3">
    //     <Form.Control 
    //       type="text"
    //       placeholder="Comment Description"
    //       value={content}
    //       onChange={(e) => setContent(e.target.value)}
    //     />
    //   </Form.Group> */}

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

export default CommentAddForm;
