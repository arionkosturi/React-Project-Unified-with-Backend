import React from "react";

function checkPublished({ isPublished, className, handlePublish }) {
  return (
    <>
      <button onClick={handlePublish} className={className}>
        <span className="mt-1">{isPublished}</span>
      </button>
    </>
  );
}

export default checkPublished;
