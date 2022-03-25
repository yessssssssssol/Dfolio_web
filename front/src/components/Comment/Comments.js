import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import * as Api from "../../api";
import Comment from "./Comment";

function Comments({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // "commentlist/유저id"로 GET 요청하고, response의 data로 comments를 세팅함.
    Api.get("commentlist", portfolioOwnerId).then((res) =>
      setComments(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Form>
      <InputGroup className="mb-3">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        ))}
        {/* {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )} */}
        {/* {isAdding && (
          <CoAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
          />
        )} */}
      </InputGroup>
    </Form>
  );
}

export default Comments;
