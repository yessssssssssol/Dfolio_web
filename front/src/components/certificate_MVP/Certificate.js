import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ certificate, setCertificates, isEditable }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate={Certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Certificate;