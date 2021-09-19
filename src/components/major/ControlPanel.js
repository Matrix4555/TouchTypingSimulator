import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getText, pauseTimer, toggleGameMode } from '../../redux/actions';
import '../../styles/control-panel.css';

export function ControlPanel() {

    const dispatch = useDispatch();
    const number = useSelector(state => state.text.numberOfSentences);
    const gameMode = useSelector(state => state.text.gameMode);

    function makeDarkMode() {

        const body = document.querySelector('body');
        const question = document.querySelector('.question-mark');
        const checks = document.querySelectorAll('.form-check-label');
        const indicators = document.querySelectorAll('.indicator');
        const indicatorBodies = document.querySelectorAll('.indicator-body');

        const dark = body.style.backgroundColor === 'white';

        body.style.backgroundColor = dark ? 'rgb(48, 48, 48)' : 'white';
        question.style.fill = dark ? 'white' : 'gray';
        [].slice.call(checks).map(el => el.style.color = dark ? 'white' : 'black');
        [].slice.call(indicators).map(el => el.style.border = dark ?
            '2px solid rgb(13, 110, 253)' :
            '1px solid rgba(0, 0, 0, 0.125)');
        [].slice.call(indicatorBodies).map(el => {
            el.style.backgroundColor = dark ? 'rgb(38, 38, 38)' : 'white';
            el.style.color = dark ? 'white' : 'black';
        });
    }

    function getNewText() {
        const btn = document.querySelector('.control-btn');
        btn.setAttribute('disabled', '');
        dispatch(getText(number))
            .then(() => btn.removeAttribute('disabled'))
            .catch(() => window.$('#danger-modal').modal('show'));
    }

    function changeNumberOfSentences() {
        dispatch(pauseTimer(true));
        window.$('#input-modal').modal('show');
    }

    return(
        <div className="control d-flex justify-content-between">
            <div>
                <button className="control-btn btn btn-primary" onClick={getNewText}>
                    Get new text
                </button>
                <button className="control-btn btn btn-primary" onClick={changeNumberOfSentences}>
                    Change number of sentences
                </button>
            </div>
            <div className="d-flex align-items-center">
                <div className="question">
                    <svg
                        className="question-mark" width="16" height="16"
                        onMouseOver={() => document.querySelector('.question-propmpt').style.display = 'block'}
                        onMouseOut={() => document.querySelector('.question-propmpt').style.display = 'none'}
                    >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path
                            d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 
                            0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 
                            1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 
                            .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z">
                        </path>
                    </svg>
                    <div className="question-propmpt">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h6 className="modal-title">Game Mode</h6>
                            </div>
                            <div className="modal-body">
                                This is a mode in which you have to write each character out of order but in random order. This increases the difficulty, improves your concentration and improves the search for the desired character while touch typing. This will be applied after updating the text.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="check-gamemode" onChange={() => dispatch(toggleGameMode(!gameMode))}/>
                    <label className="form-check-label" htmlFor="check-gamemode">Game Mode</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="check-darkmode" onChange={makeDarkMode}/>
                    <label className="form-check-label" htmlFor="check-darkmode">Dark Mode</label>
                </div>
            </div>
        </div>
    );
}
