import React, { useState } from 'react';
import { Button, Form, Col, Row, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import * as Api from '../../api';

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState('');
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState('');
  //useState로 fromDate 상태를 생성함.
  const [fromDate, setFromDate] = useState(new Date());
  //useState로 toDate 상태를 생성함.
  const [toDate, setToDate] = useState(new Date());

  const handleSubmit = async e => {
    //  페이지가 리프레쉬 되는 고유의 브라우저 동작을 preventDefault()로 막아줌
    e.preventDefault();
    // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰이는 함수
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
    await Api.post('project/create', {
      user_id: portfolioOwnerId,
      title,
      description,
      fromDate,
      toDate,
    });

    // "projectlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get('projectlist', user_id);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // projects를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
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

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            Save
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
