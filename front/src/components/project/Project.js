import React, { useState } from 'react';

import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

function Project({ project, setProjects, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  /*
  useEffect(() => {
    Api.get('projectlist', portfolioOwnerId).then(res =>
      setProjectList(res.data),
    );
  }, [portfolioOwnerId]);
  */

  return (
    <>
      {/* isEditing === true -> ProjectEditForm, false -> ProjectCard */}
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setIsEditing={setIsEditing}
          setProjects={setProjects}
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
}

export default Project;
