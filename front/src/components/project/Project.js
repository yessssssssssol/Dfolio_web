import React, { useState, useEffect } from 'react';

import * as Api from '../../api';

import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

const Project = ({ project, portfolioOwnerId, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  // 임시데이터 시작
  const project = {
    user_id: '1ee42b0b-fd43-4fb1-a7d8-74f64af482a9',
    title: '성공하고싶다',
    description: '제발!! 성공이라고 해죠!',
    from_date: '2021-03-17',
    to_date: '2021-03-19',
  };
  // 임시데이터 끝

  useEffect(() => {
    Api.get('projectlist', portfolioOwnerId).then(res =>
      setProjectList(res.data),
    );
  }, [portfolioOwnerId]);

  return (
    <>
      {/* isEditing === true -> ProjectEditForm, false -> ProjectCard */}
      {isEditing ? (
        <ProjectEditForm
          project={project}
          setIsEditing={setIsEditing}
          setProject={setProject}
        />
      ) : (
        <ProjectCard
          project={project}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
};

export default Project;
