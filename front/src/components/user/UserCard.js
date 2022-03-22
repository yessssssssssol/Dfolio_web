import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import LikeButton from "./LikeButton";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  return (
    <Card
      className="mb-2 ms-3 mr-5"
      border="light"
      style={{ width: "18rem" }}
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem", borderRadius: "70%" }}
            className="mb-3"
            src={user?.image ? user?.image : "http://placekitten.com/200/200"}
            alt="사용자 프로필 이미지입니다."
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {user?.email}
          <a href={user?.profilelink}>
            <Card.Img
              style={{ width: "1rem", height: "1rem", marginLeft: 10 }}
              className="mb-2"
              src="img/link.png"
              alt="하이퍼링크 아이콘"
            ></Card.Img>
          </a>
        </Card.Subtitle>

        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <Button variant="outline-light">Portfolio</Button>
          </Card.Link>
        )}
      </Card.Body>
      <LikeButton />
    </Card>
  );
}

export default UserCard;
