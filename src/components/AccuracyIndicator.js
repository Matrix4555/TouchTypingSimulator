import React from 'react';
import {connect} from 'react-redux';
import { Loader } from './Loader';

function AccuracyIndicator({ numberOfLetters, numberOfMistakes, loading }) {

    const accuracy = numberOfLetters ?
        ((numberOfLetters - numberOfMistakes) / numberOfLetters * 100).toFixed(2) : 0;

    return(
        <div class="card w-25 indicator">
            <div class="card-header bg-primary text-white">
                Accuracy
            </div>
            <div class="card-body">
                <h5 class="card-title">{
                    loading ? <Loader /> :
                    accuracy + '%'
                }</h5>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        numberOfLetters: state.indicator.numberOfLetters,
        numberOfMistakes: state.indicator.numberOfMistakes,
        loading: state.text.loading
    };
}

export default connect(mapStateToProps, null)(AccuracyIndicator);
