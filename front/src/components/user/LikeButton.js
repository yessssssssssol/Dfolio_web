import React, { useState, useForm } from "react";
import { Card, Button } from "react-bootstrap";

import * as Api from "../../api";

function LikeButton({ user }) {
  const [like, setLike] = useState(user.likeCount);

  console.log(user);
  const handleButtonClick = React.useCallback(async (e) => {
    e.stopPropagation();
    const resUser = await Api.get("user/current");
    const currentUser = resUser.data;
    const res = await Api.put(
      `like/${currentUser.id}`,
      {
        otherUserId: user.id,
      },
      [currentUser]
    );

    const updatedLike = res.data.likeCount;
    setLike(updatedLike);
    // const { likeCount } = await api.post();
    // setLike(likeCount);
  }, []);

  return (
    <Card.Footer className="mt-3 text-center">
      <Button
        variant="outline-warning"
        type="submit"
        onClick={handleButtonClick}
      >
        LIKE 👍 {like}
      </Button>
    </Card.Footer>
  );
}

export default LikeButton;
