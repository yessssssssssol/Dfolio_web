import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import moment from "moment";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  const handleDelete = async (e) => {
    //  페이지가 리프레쉬 되는 고유의 브라우저 동작을 preventDefault()로 막아줌
    e.preventDefault();
    // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰이는 함수
    e.stopPropagation();

    const userId = project.userId;

    // project.id로 조회하여 데이터 삭제
    await Api.delete(`projects/${project.id}`);

    // "projectlist/:userId" 엔드포인트로 GET 요청함.
    const res = await Api.get("projectlist", userId);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card.Body>
      <Row className="align-items-center">
        <Col className="col-md-10">
          <div className="portfolio-card-text">
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">
            {`${moment(project.fromDate).format("YYYY-MM-DD")} ~ ${moment(
              project.toDate
            ).format("YYYY-MM-DD")}`}
          </span>
          </div>
        </Col>
        {/* isEditable === true 인 경우 편집버튼 노출 */}
        {isEditable && (
          <Col className="col-md-2">
            <div style={{ margin: "10px 0 0 200px" }}>
            <Button
              variant="outline-info"
              style={{ width: "60px", height: "25px", fontSize: "10px", margin: "0 auto"}}
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              style={{ width: "60px", height: "25px", fontSize: "10px", margin: "0 auto"}}
              onClick={handleDelete}
              className="mr-3"
            >
              Delete
            </Button>
            </div>
          </Col>
        )}
      </Row>
    </Card.Body>
  );
}

export default ProjectCard;
