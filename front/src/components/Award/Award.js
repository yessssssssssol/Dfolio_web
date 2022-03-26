import React, { useState } from "react";

// import * as Api from "../../api";

import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ award, setAwards, isEditable }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Award;
