import React from 'react';
import { useDispatch } from 'react-redux';
import { getText, pauseTimer } from '../redux/actions';
import { useSelector } from 'react-redux';

export const ControlPanel = () => {

    const dispatch = useDispatch();
    const number = useSelector(state => state.text.numberOfSentences);

    return(
        <div className="d-flex justify-content-between">

            <div>
                <button
                    id="btn-get"
                    type="button"
                    className="btn btn-primary"
                    onClick={() => dispatch(getText(number))
                }>Get new text</button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        dispatch(pauseTimer(true));
                        window.$('#input-modal').modal('show');
                }}>Change number of sentences</button>
            </div>

            <div className="d-flex align-items-center">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Game Mode</label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Dark Mode</label>
                </div>
            </div>
            
        </div>
    );
}
