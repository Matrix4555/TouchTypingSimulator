import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/loader.css';

export function Loader({ classTitle }) {
    return(
        <div className={`${classTitle} spinner-border text-danger`} role="status">
            <span className="sr-only"></span>
        </div>
    );
}

Loader.propTypes = {
    classTitle: PropTypes.string
};
