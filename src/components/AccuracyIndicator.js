import React from 'react';
import {connect} from 'react-redux';

function AccuracyIndicator({ numberOfLetters, numberOfMistakes }) {

    const accurancy = ((numberOfLetters - numberOfMistakes) / numberOfLetters * 100).toFixed(2);

    return(
        <div class="card w-25">
            <div class="card-header bg-primary text-white">
                Accuracy
            </div>
            <div class="card-body">
                <h5 class="card-title">{ isNaN(accurancy) ? 0 : accurancy }%</h5>
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
