import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../minor/Loader';

export function SpeedIndicator() {

    const loading = useSelector(state => state.text.loading);
    const speed = useSelector(state => state.indicator.speed);

    return(
        <div className="indicator card indicator" style={{width: '300px'}}>
            <div className="card-header bg-primary text-white">
                Speed
            </div>
            <div className="indicator-body card-body">
                <h5 className="card-title">{
                    loading ?
                        <Loader classTitle={'indicator-spinner'}/> :
                        `${speed} characters per minute`
                }</h5>
            </div>
        </div>
    );
}
