import React, { useState, useEffect } from 'react';

import * as Api from '../../api';

import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

const Project = ({ project, portfolioOwnerId, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

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
