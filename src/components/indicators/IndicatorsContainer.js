import React from 'react';
import { useSelector } from 'react-redux';
import { AccuracyIndicator } from './AccuracyIndicator';
import { SpeedIndicator } from './SpeedIndicator';
import '../../styles/indicators.css';

export function IndicatorsContainer() {

    const loading = useSelector(state => state.text.loading);
    const speed = useSelector(state => state.indicator.speed);
    const accuracy = useSelector(state => state.indicator.accuracy);

    return(
        <div className="d-flex justify-content-end">
            <AccuracyIndicator accuracy={loading ? null : accuracy.toString()} />
            <SpeedIndicator speed={loading ? null : speed.toString()} />
        </div>
    );
}
