import React from 'react';
import {connect} from 'react-redux';

function SpeedIndicator({ numberOfInputtedSymbols, numberOfPassedSeconds }) {

    const speed = numberOfPassedSeconds ?
        (numberOfInputtedSymbols * 60 / numberOfPassedSeconds).toFixed(0) : 0;

    return(
        <div class="card" style={{width: '300px'}}>
            <div class="card-header bg-primary text-white">
                Speed
            </div>
            <div class="card-body">
                <h5 class="card-title">{speed} characters per minute</h5>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        numberOfInputtedSymbols: state.indicator.numberOfInputtedSymbols,
        numberOfPassedSeconds: state.indicator.numberOfPassedSeconds
    };
}

export default connect(mapStateToProps, null)(SpeedIndicator);
