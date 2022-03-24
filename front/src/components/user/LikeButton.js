import React, { useState, useForm } from "react";
import { Card, Button, ToggleButton } from "react-bootstrap";
import * as Api from "../../api";

function LikeButton() {
  const [likeCount, setLikeCount] = useState(false);
  const handleButtonClick = React.useCallback((e) => {
    e.stopPropagation();
    /**
     * api like
     */
    // const { likeCount } = await api.post();
    // setLike(likeCount);
  }, []);

  return (
    <Card.Footer className="mt-3 text-center">
      <Button variant="outline-warning" onClick={handleButtonClick}>
        
        {likeCount}
      </Button>
    </Card.Footer>
  );
}

export default LikeButton;
