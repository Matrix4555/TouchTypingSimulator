import React from 'react';
import {connect} from 'react-redux';
import { Loader } from './Loader';

function SpeedIndicator({ inputtedCharacters, passedSeconds, loading }) {

    const speed = passedSeconds ?
        (inputtedCharacters * 60 / passedSeconds).toFixed(0) : 0;

    return(
        <div className="card indicator" style={{width: '300px'}}>
            <div className="card-header bg-primary text-white">
                Speed
            </div>
            <div className="card-body">
                <h5 className="card-title">{
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
