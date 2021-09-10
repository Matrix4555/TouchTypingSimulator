import React from 'react';
import { connect } from 'react-redux';
import { Loader } from './Loader';
import { addSecond, addInputtedSymbol, addMistake, pauseTimer } from '../redux/actions';
import $ from 'jquery';

class Text extends React.Component {
    constructor(props) {
        super(props);
        
        this.charClass = 'character fs-4'; 
        this.currentText = 'Click the \'Get new text\' button to start';
        this.characters = null;
        this.counter = null;
        this.currentCharacterHasError = false;

        this.gameMode = false;
        this.used = [];

        setInterval(() => {
            if(!this.props.pauseTimerIsActive)
                this.props.addSecond();
        }, 1000);

        this.setHandlers();
    }

    setHandlers() {

        $('body').on('click', event => {
            if($(event.target).is('#number-value'))     // permit to focus on entering the number of sentences
                return;
            $('.text-field').trigger('focus');
        });

        $('body').on('keydown', event => {

            if(!$('.text-field').is(':focus') ||
                !this.characters ||
                event.key.length !== 1) {               // the pressed button must be just a character without long name
                return;
            }

            if(event.key.match(/[а-я]/i)) {             // check for cyrillic
                this.showAlert();
                return;
            }

            if(event.key === $('.current').text())
                this.correctInput();
            else if(!this.currentCharacterHasError)
                this.wrongInput();
            
        });
    }

    correctInput() {

        this.characters[this.counter].className = `${this.charClass} passed`;
        this.currentCharacterHasError = false;

        const amountOfCharacters = this.characters.length;
        // if we have typed a last character
        if((!this.gameMode && this.counter + 1 === amountOfCharacters) || this.used.length + 1 === amountOfCharacters) {
            this.used = [];
            this.props.pauseTimer(true);
            window.$('#modal-result').modal('show');
            $('.indicator').css('z-index', '9999');
            return;
        }

        if(this.gameMode) {
            this.used.push(this.counter);
            while(true) {
                this.counter = this.getRandom(amountOfCharacters);
                if(!this.used.includes(this.counter))
                    break;
            }
            this.characters[this.counter].className = `${this.charClass} current`;
        }
        else
            this.characters[++this.counter].className = `${this.charClass} current`;

        this.props.pauseTimer(false);
        this.props.addInputtedSymbol();
    }

    wrongInput() {
        this.characters[this.counter].className = `${this.charClass} current mistaked`;
        this.currentCharacterHasError = true;
        this.props.addMistake();
    }

    showAlert() {
        const alert = $('.alert');
        if(alert.css('display') === 'none') {
            setTimeout(() => {
                alert.css('transform', 'translate(-350px, 0)');
                setTimeout(() => alert.css('display', 'none'), 500);    // .5s is the transition time
            }, 4000);
        }
        alert.css('display', 'block');
        setTimeout(() => alert.css('transform', 'translate(0, 0)'), 0);
    }

    getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    componentDidUpdate() {

        // if the text hasn't changed when the state was updated or loading is working then skip the next changes
        if(this.currentText === this.props.text || this.props.loading)
            return;
        
        this.currentText = this.props.text;
        this.gameMode = this.props.gameMode;
        
        this.characters = $('.character');
        this.counter = !this.props.gameMode ? 0 : this.getRandom(this.characters.length);
        this.characters[this.counter].className = `${this.charClass} current`;

        $('.text-field').trigger('focus');
    }

    render() {
        
        // if the text repeats then it may contain an asterisk (more details in textReducer)
        // we have to remove it here
        const text = this.props.text.replace('*', '');

        return(
            <div className="text-field container bg-primary text-white rounded mt-2 mb-2 d-flex justify-content-center" tabIndex="0">{
                this.props.loading ?
                    <Loader certainId={'text-spinner'}/> :
                    <p className="align-self-center">{
                        text.split('').map((letter, index) => <span className={this.charClass} key={index}>{letter}</span>)
                    }</p>
            }</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        text: state.text.text,
        pauseTimerIsActive: state.text.pauseTimer,
        loading: state.text.loading,
        gameMode: state.text.gameMode
    };
}

const mapDispatchToProps = {
    addSecond, addInputtedSymbol, addMistake, pauseTimer
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);
