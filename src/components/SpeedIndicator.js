import React from 'react';
import {connect} from 'react-redux';
import { Loader } from './Loader';

function SpeedIndicator({ numberOfInputtedSymbols, numberOfPassedSeconds, loading }) {

    const speed = numberOfPassedSeconds ?
        (numberOfInputtedSymbols * 60 / numberOfPassedSeconds).toFixed(0) : 0;

    return(
        <div class="card indicator" style={{width: '300px'}}>
            <div class="card-header bg-primary text-white">
                Speed
            </div>
            <div class="card-body">
                <h5 class="card-title">{
                    loading ? <Loader /> : `${speed} characters per minute`
                }</h5>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        numberOfInputtedSymbols: state.indicator.numberOfInputtedSymbols,
        numberOfPassedSeconds: state.indicator.numberOfPassedSeconds,
        loading: state.text.loading
    };
}

export default connect(mapStateToProps, null)(SpeedIndicator);
