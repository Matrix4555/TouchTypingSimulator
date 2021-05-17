import React from 'react';
import {connect} from 'react-redux';
import { Loader } from './Loader';

function SpeedIndicator({ inputtedCharacters, passedSeconds, loading }) {

    const speed = passedSeconds ?
        (inputtedCharacters * 60 / passedSeconds).toFixed(0) : 0;

    return(
        <div class="card indicator" style={{width: '300px'}}>
            <div class="card-header bg-primary text-white">
                Speed
            </div>
            <div class="card-body">
                <h5 class="card-title">{
                    loading ? <Loader certainId={'indicator-spinner'}/> :
                    `${speed} characters per minute`
                }</h5>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        inputtedCharacters: state.indicator.inputtedCharacters,
        passedSeconds: state.indicator.passedSeconds,
        loading: state.text.loading
    };
}

export default connect(mapStateToProps, null)(SpeedIndicator);
