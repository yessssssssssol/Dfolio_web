import React, { useState } from "react";

import * as Api from "../../api";

import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ Education, setEducations, isEditable }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={Education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          Education={Education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Education;
