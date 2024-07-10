import React from 'react';

function checkPublished({ isPublished, className, handlePublish }) {
    return (
        <>
            <button onClick={handlePublish} className={className}>
                {isPublished}
            </button>
        </>
    );
}

export default checkPublished;
