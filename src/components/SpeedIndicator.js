import React from 'react';
import {connect} from 'react-redux';

function SpeedIndicator({ speed }) {
    return(
        <div>
            <div className="card-body bg-info text-white mt-3">
                <h5 className="card-title">Speed</h5>
                <p className="card-text">{speed} знаков в минуту</p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        speed: state.indicator.speed
    };
}

export default connect(mapStateToProps, null)(SpeedIndicator);
