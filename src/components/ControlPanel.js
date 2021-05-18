import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getText, pauseTimer, toggleGameMode } from '../redux/actions';
import $ from 'jquery';

export const ControlPanel = () => {

    const dispatch = useDispatch();
    const number = useSelector(state => state.text.numberOfSentences);
    const gameMode = useSelector(state => state.text.gameMode);

    function makeDarkMode(dark) {
        $('body').css('background-color', dark ? '#303030' : 'white');
        $('.form-check-label').css('color', dark ? 'white' : 'black');
        $('.question-mark').css('fill', dark ? 'white' : 'gray');
        $('.card').css('border', dark ? '2px solid #0d6efd' : '1px solid rgba(0, 0, 0, 0.125)');
        $('.card-body').css('background-color', dark ? 'rgb(38, 38, 38)' : 'white');
        $('.card-body').css('color', dark ? 'white' : 'black');
    }

    return(
        <div className="d-flex justify-content-between">
            <div>
                <button id="btn-get" type="button" className="btn btn-primary" onClick={() => dispatch(getText(number))}>
                    Get new text
                </button>
                <button className="btn btn-primary" onClick={() => {
                    dispatch(pauseTimer(true));
                    window.$('#input-modal').modal('show');
                }}>
                    Change number of sentences
                </button>
            </div>
            <div className="d-flex align-items-center">
                <div className="question">
                    <svg className="question-mark"width="16" height="16"
                        onMouseOver={() => window.$('#prompt-question-mark').css('display', 'block')}
                        onMouseOut={() => window.$('#prompt-question-mark').css('display', 'none')}
                    >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path
                            d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 
                            0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 
                            1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 
                            .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z">
                        </path>
                    </svg>
                    <div id="prompt-question-mark">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h6 className="modal-title" id="exampleModalLabel">Game Mode</h6>
                            </div>
                            <div className="modal-body">
                                This is a mode in which you have to write each character out of order but in random order. This increases the difficulty, improves your concentration and improves the search for the desired character while touch typing. This will be applied after updating the text.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => dispatch(toggleGameMode(!gameMode))}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Game Mode</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => makeDarkMode($('body').css('background-color') === 'rgb(255, 255, 255)')}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                </div>
            </div>
        </div>
    );
}
