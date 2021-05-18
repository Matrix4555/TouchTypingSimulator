import React from 'react';
import {connect} from 'react-redux';
import { Loader } from './Loader';

function AccuracyIndicator({ characters, mistakes, loading }) {

    const accuracy = characters ?
        ((characters - mistakes) / characters * 100).toFixed(2) : 0;

    return(
        <div className="card w-25 indicator">
            <div className="card-header bg-primary text-white">
                Accuracy
            </div>
            <div className="card-body">
                <h5 className="card-title">{
                    loading ? <Loader certainId={'indicator-spinner'}/> :
                    `${accuracy}%`
                }</h5>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        characters: state.indicator.characters,
        mistakes: state.indicator.mistakes,
        loading: state.text.loading
    };
}

export default connect(mapStateToProps, null)(AccuracyIndicator);
