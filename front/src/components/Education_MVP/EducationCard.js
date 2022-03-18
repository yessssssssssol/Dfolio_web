import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
// import * as Api from "../../api";

function EducationCard({ Education, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{Education.title}</span>
          <br />
          <span className="text-muted">{Education.description}</span>
          <br />
          <span>{Education.whenDate}</span>
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
    </Card.Text>
  );
}

export default EducationCard;
