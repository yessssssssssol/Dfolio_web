import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";

function Comments({ portfolioOwnerId }) {
  //useState로 Comments 상태를 생성함.
  const [comments, setComments] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "commentlist/유저id"로 GET 요청하고, response의 data로 comments를 세팅함.
    Api.get("commentlist", portfolioOwnerId).then((res) =>
      setComments(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Comment</Card.Title>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            setComments={setComments}
            portfolioOwnerId={portfolioOwnerId}
          />
        ))}
        {/* {isAdding && (
          <CommentAddForm
            portfolioOwnerId={portfolioOwnerId}
            setComments={setComments}
            setIsAdding={setIsAdding}
          />
        )} */}
      </Card.Body>
    </Card>
  );
}

export default Comments;
