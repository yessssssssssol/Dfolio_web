import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const EducationCard = ({ education, isEditable, setIsEditing }) => {
  return (
    <Card.Body>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span>{education.major}</span>
          <br />
          <span>{education.position}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Body>
  );
}
export default EducationCard;