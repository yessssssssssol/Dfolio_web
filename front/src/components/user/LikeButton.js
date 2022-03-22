import React, { useState, useForm } from "react";
import { Card, Button } from "react-bootstrap";

// import * as Api from "../../api";

function LikeButton() {
  const [like, setLike] = useState(0);

  const handleButtonClick = React.useCallback((e) => {
    e.stopPropagation();
    /**
     * api like
     */
    // const { likeCount } = await api.post();
    // setLike(likeCount);
  }, [])

  return (
    <Card.Footer className="mt-3 text-center">
        <Button variant="outline-warning" type="submit" onClick={handleButtonClick}>
          LIKE 👍 {like}
        </Button>
      
    </Card.Footer>
  );
}

export default LikeButton;
