import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import * as Api from "../../api";

function Comment({ portfolioOwnerId, comment, setComments, comments }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;

    // "comment/create" 엔드포인트로 post요청함.
    const res = await Api.post("comment/create", {
      hostId: userId,
      content,
    });
    setContent(res.data.content);

    const rescomment = await Api.get("commentlist", userId);
    // awards를 response의 data로 세팅함.

    const newComments = comments.map((comment) => {
      if (comment.id === rescomment.data.id) {
        return {
          ...comment,
          content: rescomment.data.content,
        };
      }
      return comment;
    });
    setComments(newComments);
  };

  useEffect(() => {
    // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
    Api.get("commentlist", portfolioOwnerId).then((res) =>
      setComments(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          placeholder="Comment plz"
          aria-label="Comment plz"
          value={content}
          aria-describedby="basic-addon2"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Click
        </Button>
      </InputGroup>
    </Form>
  );
}

export default Comment;
