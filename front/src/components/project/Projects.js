import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import addBtn from '../../img/addBtn.png'
import '../../styles/scss/Portfolio.scss';

import * as Api from '../../api';

import Project from './Project';
import ProjectAddForm from './ProjectAddForm';

function Projects({ portfolioOwnerId, isEditable }) {
  // useState로 projects 상태를 생성함.
  const [projects, setProjects] = useState([]);
  // useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "projectlist/유저id"로 GET 요청하고, response의 data로 projects 세팅함.
    Api.get('projectlist', portfolioOwnerId).then(res => setProjects(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card id="portfolio-card-body">
      <Card.Body style={{ padding: "30px 40px" }}>
        <Card.Title>Project</Card.Title>
        {/* Project list를 map 함수로 뿌려줌 */}
        {projects.map(project => (
          <Project
            key={project.id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {/* isEditable === true -> + button  */}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
            <div className="portfolio-add-btn" onClick={() => setIsAdding(true)}><img className="portfolio-add-img" src={addBtn}/>Add Project</div>
            </Col>
          </Row>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;
