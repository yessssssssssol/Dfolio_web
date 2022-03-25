import React from "react";
import { Card, Row, Col, Button, InputGroup } from "react-bootstrap";
import * as Api from "../../api";

function CommentCard({ portfolioOwnerId, comment, setComments, comments }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const handleDelete = async (e) => {
    //  페이지가 리프레쉬 되는 고유의 브라우저 동작을 preventDefault()로 막아줌
    e.preventDefault();
    // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰이는 함수
    e.stopPropagation();

    const userId = portfolioOwnerId;

    // comment.id로 조회하여 데이터 삭제
    await Api.delete(`comments/${comment.id}`);

    // "commentlist/:userId" 엔드포인트로 GET 요청함.
    const res = await Api.get("commentlist", userId);

    setComments(res.data);
  };

  return (
    <Card.Body>
      <Row className=" mr-3 align-items-center">
        <Col>{comment.content}</Col>
        <Col>{comment.author}</Col>
        <Col>
          <Button
            variant="light"
            size="sm"
            onClick={handleDelete}
            className=" mr-3 align-items-center"
          >
            x
          </Button>
        </Col>
      </Row>
    </Card.Body>
  );
}

export default CommentCard;
