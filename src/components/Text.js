import React from 'react';
import { connect } from 'react-redux';
import { getText } from '../redux/actions';
import '../style.css';
import $ from 'jquery';

class Text extends React.Component {
    constructor(props) {
        super(props);

        this.letters = null;
        this.counter = null;

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

                console.log('true');
            }
            else {
                this.letters[this.counter].className = 'letter fs-2 mistaked';
                console.log('false, should press ' + currentLetter);
            }

        });
    }

    async updateText() {
        await this.props.getText();
        this.letters = $('.letter');
        this.counter = 0;
        this.letters[this.counter].className = 'letter fs-2 current'; 
    }

    render() {
        return(
            <div className="container pt-5">
                <div className="d-flex flex-row align-items-center bg-info text-white mb-3">
                    <button id="btn-get" type="button" className="btn btn-primary" onClick={() => this.updateText()}>Get</button>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Game Mode</label>
                    </div>
                </div>
                <div className="container bg-primary text-white rounded border border-success">
                    <p className="text-center pt-3">{this.props.receivedText.split('').map((letter, index) => {
                        return <span className="letter fs-2" key={index}>{letter}</span>;
                    })}</p>
                </div>
            </div>
        );
    }
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
