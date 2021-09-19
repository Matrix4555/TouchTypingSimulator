import React from 'react';
import { Loader } from '../minor/Loader';
import PropTypes from 'prop-types';

export function SpeedIndicator({speed}) {
    return(
        <div className="indicator speed-indicator card">
            <div className="card-header bg-primary text-white">
                Speed
            </div>
            <div className="indicator-body card-body">
                <h5 className="card-title">{
                    speed ?
                        `${speed} characters per minute` :
                        <Loader classTitle={'indicator-spinner'}/>
                }</h5>
            </div>
        </div>
    );
}

SpeedIndicator.propTypes = {
    speed: PropTypes.string
};
