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

        this.pauseTimer = true;
        setInterval(() => {
            if(!this.pauseTimer && !this.props.thirdPartyPauseTimer)
                this.props.dispatch(addSecond());
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
            else if(!this.currentCharacterHasError) {
                this.wrongInput();
                console.log($('.current').text());
            }

        });
    }

    correctInput() {
        this.characters[this.counter].className = 'character fs-4 passed';

        if(this.counter + 1 === this.characters.length) {      // after we have typed the last character
            this.pauseTimer = true;
            window.$('#modal-result').modal('show');
            $('.indicator').css('z-index', '9999');
            return;
        }

        this.characters[++this.counter].className = 'character fs-4 current';
        this.currentCharacterHasError = false;
        
        this.pauseTimer = false;
        this.props.dispatch(addInputtedSymbol());
    }

    wrongInput() {
        this.currentCharacterHasError = true;
        this.props.dispatch(addMistake());
        this.characters[this.counter].className = 'character fs-4 current mistaked';
    }

    showAlert() {
        const alert = $('.alert');
        if(alert.css('display') === 'none') {
            setTimeout(() => {
                alert.css('transform', 'translate(-350px, 0)');
                setTimeout(() => alert.css('display', 'none'), 500);    // .5s is transition time
            }, 4000);
        }
        alert.css('display', 'block');
        setTimeout(() => alert.css('transform', 'translate(0, 0)'), 0);
    }

    componentDidUpdate() {      // when we update the text (after state change)

        if(this.props.loading)
            return;

        // we must track the input-modal because it changes the state of current component and
        // render will happen but we have to prevent it
        let displayOfInputModal = $('#input-modal').css('display');
        // the input-modal doesn't have time to change its display css property but actualy
        // when the third party pause becomes active, it speaks that that property is block
        // because this pause is active only after opening of input-modal
        if(this.props.thirdPartyPauseTimer)
            displayOfInputModal = 'block';

        if(displayOfInputModal === 'block')
            return;

        this.characters = $('.character');
        this.counter = 0;
        this.characters[0].className = 'character fs-4 current';
        this.currentCharacterHasError = false;


        $('.text-field').trigger('focus');
    }

    render() {
        
        // if the text repeats then it may contain an asterisk (more details in textReducer)
        // we have to remove it
        const text = this.props.text.replace('*', '');

        return(
            <div
                className="text-field container bg-primary text-white rounded mt-2 mb-2 d-flex justify-content-center"
                tabindex="0"
            >{this.props.loading ?
                <Loader certainId={'text-spinner'}/> :
                <p className="align-self-center pt-2 pb-1">{text.split('').map((letter, index) =>
                    <span className="character fs-4" key={index}>{letter}</span>
                )}</p>
            }</div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        text: state.text.text,
        thirdPartyPauseTimer: state.text.pauseTimer,
        loading: state.text.loading
        // toggle mode
    };
}

export default connect(mapStateToProps, null)(Text);
