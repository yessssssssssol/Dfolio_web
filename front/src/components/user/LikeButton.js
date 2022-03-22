import React, { useState, useForm } from "react";
import { Card, Button } from "react-bootstrap";

// import * as Api from "../../api";

function LikeButton() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }
  const [like, setLike] = useState(0);

  return (
    <Card.Footer className="mt-3 text-center">
      <form onSubmit={handleSubmit}>
        <Button variant="outline-warning" type="submit">
          LIKE 👍 {like}
        </Button>
      </form>
    </Card.Footer>
  );
}

export default LikeButton;
