import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducations, isEditable }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const [isEditing, setIsEditing] = useState(false);

  // console.log({education});
  // education = {
  //   school: "test",
  //   major: "test",
  //   position: "재학중",
  // };

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
        />
      )}
    </>
  );
}
export default Education;
