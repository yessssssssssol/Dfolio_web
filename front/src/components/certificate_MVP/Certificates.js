import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import addBtn from "../../img/addBtn.png";
import "../../styles/scss/Portfolio.scss";

function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 Certificates 상태를 생성함.
  const [certificates, setCertificates] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "certificatelist/유저id"로 GET 요청하고, response의 data로 certificates를 세팅함.
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card id="portfolio-card-body">
      <Card.Body style={{ padding: "30px 40px" }}>
        <Card.Title>Certificates</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate.id}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <div
                className="portfolio-add-btn"
                style={{ cursor: "pointer" }}
                onClick={() => setIsAdding(true)}
              >
                <img className="portfolio-add-img" src={addBtn} />
                Add Certificate
              </div>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
