import React from 'react';
import { Loader } from '../minor/Loader';
import PropTypes from 'prop-types';

export function AccuracyIndicator({accuracy}) {
    return(
        <div className="indicator accuracy-indicator card w-25">
            <div className="card-header bg-primary text-white">
                Accuracy
            </div>
            <div className="indicator-body card-body">
                <h5 className="card-title">{
                    accuracy ?
                        `${accuracy}%` :
                        <Loader classTitle={'indicator-spinner'}/>
                }</h5>
            </div>
        </div>
    );
}

AccuracyIndicator.propTypes = {
    accuracy: PropTypes.string
};
