import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = props =>
    <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>Page Not Found</h1>
            <p>Hmmm, we're unable to find that page.</p>
            <button className="button"><Link to="/" className="button--link">Head home</Link></button>
        </div>
    </div>;

export default NotFound;
