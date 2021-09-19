import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../minor/Loader';

export function AccuracyIndicator() {

    const loading = useSelector(state => state.text.loading);
    const accuracy = useSelector(state => state.indicator.accuracy);

    return(
        <div className="indicator card w-25 indicator">
            <div className="card-header bg-primary text-white">
                Accuracy
            </div>
            <div className="indicator-body card-body">
                <h5 className="card-title">{
                    loading ?
                        <Loader classTitle={'indicator-spinner'}/> :
                        `${accuracy}%`
                }</h5>
            </div>
        </div>
    );
}
