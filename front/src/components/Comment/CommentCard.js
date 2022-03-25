import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CommentCard({ portfolioOwnerId, comment, setComments }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";

  return (
    <Card.Body>
      <Row className="align-items-center">
        <Col>{comment.content}</Col>
      </Row>
    </Card.Body>
  );
}

export default CommentCard;
