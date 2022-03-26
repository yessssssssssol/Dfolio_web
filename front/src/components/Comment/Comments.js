import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from "../../api";
import CommentCard from "./CommentCard";
import CommentAddForm from "./CommentAddForm";

function Comments({ portfolioOwnerId }) {
  //useState로 awards 상태를 생성함.
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // "commentlist/유저id"로 GET 요청하고, response의 data로 comments를 세팅함.
    Api.get("commentlist", portfolioOwnerId).then((res) =>
      setComments(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Comments</Card.Title>
        <CommentAddForm
          portfolioOwnerId={portfolioOwnerId}
          setComments={setComments}
        />
        {comments.map((comment) => (
          <CommentCard
            portfolioOwnerId={portfolioOwnerId}
            key={comment.id}
            comment={comment}
            setComments={setComments}
          />
        ))}
      </Card.Body>
    </Card>
  );
}

export default Comments;
