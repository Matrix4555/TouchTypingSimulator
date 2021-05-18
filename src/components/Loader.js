import React from 'react';

export const Loader = ({certainId}) => {
    return(
        <div className="spinner-border text-danger" id={certainId} role="status">
            <span className="sr-only"></span>
        </div>
    );
}
