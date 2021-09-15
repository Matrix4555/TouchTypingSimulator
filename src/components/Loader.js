import React from 'react';
import PropTypes from 'prop-types';

export const Loader = ({certainId}) => {
    return(
        <div className="spinner-border text-danger" id={certainId} role="status">
            <span className="sr-only"></span>
        </div>
    );
};

Loader.propTypes = {
    certainId: PropTypes.string
};
