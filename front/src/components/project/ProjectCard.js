import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

function ProjectCard({ project, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">
            {project.form_date}~{project.to_date}
          </span>
        </Col>
        {/* isEditable === true 인 경우 편집버튼 노출 */}
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              a
              onClick={() => setIsEditing(prev => !prev)}
              className="mr-3"
            >
              Edit
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
