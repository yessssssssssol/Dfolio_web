import React, { useState } from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import * as Api from "../../api";

function CommentAddForm({ portfolioOwnerId, setComments }) {
  //useState로 title 상태를 생성함.
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const userId = portfolioOwnerId;

    // "content/register" 엔드포인트로 post요청함.
    await Api.post("comment/register", {
      hostId: userId,
      content,
    });
    // "certificatelist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("commentlist", userId);
    // certificates를 response의 data로 세팅함.
    setComments(res.data);
    // Certificate를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
  };

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

export default CommentAddForm;
