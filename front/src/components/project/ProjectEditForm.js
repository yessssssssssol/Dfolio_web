import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import * as Api from '../../api';

const ProjectEditForm = ({ currentProject, setProjects, setIsEditing }) => {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentProject.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentProject.description);

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const user_id = currentProject.user_id;

    // "projects/:id" 엔드포인트로 PUT 요청함.
    await Api.put(`projects/${currentProject.id}`, {
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    // "projectlist/:user_id" 엔드포인트로 GET 요청함.
    const res = await Api.get('projectlist', user_id);
    // awards를 response의 data로 세팅함.
    setProjects(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="Project Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form.Group>

      <FormGroup as={Row}>
        <Col xs="auto">
          <DatePicker
            selected={fromDate}
            onChange={date => setFromDate(date)}
          />
        </Col>
        <Col xs="auto">
          <DatePicker selected={toDate} onChange={date => setToDate(date)} />
        </Col>
      </FormGroup>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ProjectEditForm;
