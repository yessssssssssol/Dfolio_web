import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import addBtn from '../../img/addBtn.png'
import '../../styles/scss/Portfolio.scss';

import * as Api from "../../api";

import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

function Educations({ portfolioOwnerId, isEditable }) {
  //useState로 Educations 상태를 생성함.
  const [educations, setEducations] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "Educationlist/유저id"로 GET 요청하고, response의 data로 Educations를 세팅함.
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card id="portfolio-card-body">
      <Card.Body style={{ padding: "30px 40px" }}>
        <Card.Title>Educations</Card.Title>
        {educations.map((education) => (
          <Education
            key={education.id}
            education={education}
            setEducations={setEducations}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <div className="portfolio-add-btn" onClick={() => setIsAdding(true)}><img className="portfolio-add-img" src={addBtn}/>Add Education</div>
            </Col>
          </Row>
        )}
        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducations={setEducations}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}
export default Educations;
