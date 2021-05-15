import React from 'react';
import { connect } from 'react-redux';
import '../style.css';
import $ from 'jquery';
import { Loader } from './Loader';
import { addMistake, setSpeed } from '../redux/actions';

class Text extends React.Component {
    constructor(props) {
        super(props);

        this.letters = null;
        this.counter = null;
        this.currentLetterHasError = false;

        setTimeout(() => {
            $('#btn-get').on('click', function() {
                this.blur();
            })
        }, 0)

        $('body').on('keydown', event => {
            if(event.key.length !== 1)      // pressed button mustn't be with long title because it must be a symbol
                return;
            const currentLetter = this.letters[this.counter].innerHTML;
            if(event.key === currentLetter) {
                this.letters[this.counter].className = 'letter fs-2 passed';
                this.counter++;
                this.letters[this.counter].className = 'letter fs-2 current';
                this.currentLetterHasError = false;
                //console.log('true');
            }
            else if(!this.currentLetterHasError) {
                this.currentLetterHasError = true;
                this.props.dispatch(addMistake());
                this.letters[this.counter].className = 'letter fs-2 mistaked';
                //console.log('false, should press ' + currentLetter);
            }
        });

    }

    componentDidUpdate() {          // when we got new text
        if(this.props.loading)
            return;
        this.letters = $('.letter');
        this.counter = 0;
        this.letters[0].className = 'letter fs-2 current';
        this.currentLetterHasError = false;

        //console.log('component Did Update');
    }

    render() {
        return(    
            <div className="container bg-primary text-white rounded border border-success">
                {this.props.loading ?
                    <Loader /> : 
                    <p className="text-center pt-3">{this.props.receivedText.split('').map((letter, index) => {
                        return <span className="letter fs-2" key={index}>{letter}</span>;
                    })}</p>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        receivedText: state.text.text,
        loading: state.text.loading
    };
}

export default connect(mapStateToProps, null)(Text);
