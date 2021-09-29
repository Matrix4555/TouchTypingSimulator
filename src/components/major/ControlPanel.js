import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getText, pauseTimer, toggleGameMode } from '../../redux/actions';
import { MoreInfo } from '../minor/MoreInfo';
import { showModal, blockBtnAndDispatchGetText } from '../../functions';
import '../../styles/control-panel.css';

export function ControlPanel() {

    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.text.gameMode);

    function getNewText() {
        blockBtnAndDispatchGetText(dispatch(getText()));
    }

    function showInputModal() {
        dispatch(pauseTimer(true));
        showModal('#input-modal');
    }

    function checkAndToggleGameMode() {
        const shouldTurnOn = !gameMode;
        dispatch(toggleGameMode(shouldTurnOn));
    }

    function toggleDarkMode() {

        const body =            document.querySelector('body');
        const question =        document.querySelector('.question-mark');
        const checks =          document.querySelectorAll('.form-check-label');
        const indicators =      document.querySelectorAll('.indicator');
        const indicatorBodies = document.querySelectorAll('.indicator-body');

        const bodyIsWhite = isBodyWhite();

        body.style.backgroundColor =                            bodyIsWhite ? 'rgb(48, 48, 48)' : 'white';
        question.style.fill =                                   bodyIsWhite ? 'white' : 'gray';
        [].slice.call(checks).map(el => el.style.color =        bodyIsWhite ? 'white' : 'black');
        [].slice.call(indicators).map(el => el.style.border =   bodyIsWhite ? '2px solid rgb(13, 110, 253)' : '1px solid rgba(0, 0, 0, 0.125)');
        [].slice.call(indicatorBodies).map(el => {
            el.style.backgroundColor =                          bodyIsWhite ? 'rgb(38, 38, 38)' : 'white';
            el.style.color =                                    bodyIsWhite ? 'white' : 'black';
        });
    }

    function isBodyWhite() {
        const bodyBGColor = document.querySelector('body').style.backgroundColor;
        return bodyBGColor === 'white' || bodyBGColor === '';
    }

    return(
        <div className="control d-flex justify-content-between">
            <div>
                <button className="control-btn btn-get_text btn btn-primary" onClick={getNewText}>
                    Get new text
                </button>
                <button className="control-btn btn-change_number btn btn-primary" onClick={showInputModal}>
                    Change number of sentences
                </button>
            </div>
            <div className="d-flex align-items-center">
                <MoreInfo />
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="check-gamemode" onChange={checkAndToggleGameMode}/>
                    <label className="form-check-label" htmlFor="check-gamemode">Game Mode</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="check-darkmode" onChange={toggleDarkMode}/>
                    <label className="form-check-label" htmlFor="check-darkmode">Dark Mode</label>
                </div>
            </div>
        </div>
    );
}
