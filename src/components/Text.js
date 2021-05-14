import React from 'react';
import { connect } from 'react-redux';
import { getText } from '../redux/actions';

const Text = props => {

    return(
        <div>
            <p className="text-center">{props.receivedText}</p>
            <button type="button" className="btn btn-primary" onClick={() => props.getText()}>Get</button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        receivedText: state.text.text
    };
}

const mapDispatchToProps = {
    getText
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);
