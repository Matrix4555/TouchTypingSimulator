import React from 'react';
import {connect} from 'react-redux';

function AccuracyIndicator({ numberOfLetters, numberOfMistakes }) {

    const accurancy = ((numberOfLetters - numberOfMistakes) / numberOfLetters * 100).toFixed(2);

    return(
        <div>
            <div className="card-body bg-info text-white mt-3">
                <h5 className="card-title">Accurancy</h5>
                <p className="card-text">{accurancy}%</p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        numberOfLetters: state.indicator.numberOfLetters,
        numberOfMistakes: state.indicator.numberOfMistakes
    };
}

export default connect(mapStateToProps, null)(AccuracyIndicator);
