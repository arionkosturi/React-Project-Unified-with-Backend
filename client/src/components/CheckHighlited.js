import React from "react";
import { FaStar } from "react-icons/fa";
function checkHighlighted({ isHighlighted, className, handleHighlighted }) {
  return (
    <>
      <button onClick={handleHighlighted} className={className}>
        <span className="ml-4 mt-1"> {isHighlighted}</span>
        <FaStar className="text-yellow-300 text-xl mt-1" />
      </button>
    </>
  );
}

export default checkHighlighted;
