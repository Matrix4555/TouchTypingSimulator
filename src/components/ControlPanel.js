import React from 'react';

import { useDispatch } from 'react-redux';
import { getText } from '../redux/actions';

export const ControlPanel = () => {

    const dispatch = useDispatch();
    // d-flex flex-row align-items-center bg-info text-white mb-3
    return(
        <div className="d-flex justify-content-between">

            <div>
                <button
                    id="btn-get"
                    type="button"
                    className="btn btn-primary"
                    onClick={() => dispatch(getText())}
                >Get Text</button>
                <button className="btn btn-primary">Change number of sentences</button>
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
