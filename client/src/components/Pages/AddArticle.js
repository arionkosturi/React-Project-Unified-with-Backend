import React from 'react';
import { Link } from 'react-router-dom';

function AddArticle({ className }) {
    return (
        <Link to="/new">
            <button className={className}>Add new Article</button>
        </Link>
    );
}

export default AddArticle;
