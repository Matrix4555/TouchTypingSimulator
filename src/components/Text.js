import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Loader } from './Loader';
import { addInputtedSymbol, addMistake, addSecond } from '../redux/actions';

class Text extends React.Component {
    constructor(props) {
        super(props);
        
        this.characters = null;
        this.counter = null;
        this.currentCharacterHasError = false;
        this.fontSize = 3;
        this.timerPause = true;

        setInterval(() => {
            if(!this.timerPause)
                this.props.dispatch(addSecond());
        }, 1000);

        setTimeout(() => {
            $('#btn-get').on('click', event => event.target.blur());
        }, 0);

        $('body').on('keydown', event => {

            if(event.key.length !== 1)      // the pressed button must be just a character without long name
                return;
            
            if(event.key === $('.current').text()) {

                if(this.counter + 1 === this.characters.length) {      // after we have typed the last character
                    this.timerPause = true;
                    window.$('#modal-result').modal('show');
                    $('.indicator').css('z-index', '9999');
                    return;
                }

                this.characters[this.counter].className = `character fs-${this.fontSize} passed`;
                this.characters[++this.counter].className = `character fs-${this.fontSize} current`;
                this.currentCharacterHasError = false;

                this.timerPause = false;
                this.props.dispatch(addInputtedSymbol());

            }
            else if(!this.currentCharacterHasError) {
                this.currentCharacterHasError = true;
                this.props.dispatch(addMistake());
                this.characters[this.counter].className = `character fs-${this.fontSize} current mistaked`;
            }
        });

    }

    componentDidUpdate() {          // when we update the text

        if(this.props.loading)
            return;
            
        if(this.props.numberOfSentences > 4)
            this.fontSize = 5;

        this.characters = $('.character');
        this.counter = 0;
        this.characters[0].className = `character fs-${this.fontSize} current`;
        this.currentCharacterHasError = false;

    }

    render() {
        return(
            <div
                className="container text bg-primary text-white rounded border mt-2 mb-2 d-flex justify-content-center"
                style={{height: '350px'}}
            >{this.props.loading ?
                <Loader /> : 
                <p className="align-self-center">{

                    this.props.text.split('').map((letter, index) =>
                        <span className={`character fs-${this.fontSize}`} key={index}>{letter}</span>)
                
                }</p>
            }</div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        text: state.text.text,
        loading: state.text.loading,
        numberOfSentences: state.text.numberOfSentences
    };
}

export default connect(mapStateToProps, null)(Text);
