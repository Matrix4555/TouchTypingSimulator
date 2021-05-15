import React from 'react';

import { useDispatch } from 'react-redux';
import { getText } from '../redux/actions';

export const ControlPanel = () => {

    const dispatch = useDispatch();

    return(
        <div className="d-flex flex-row align-items-center bg-info text-white mb-3">
            <button
                id="btn-get"
                type="button"
                className="btn btn-primary"
                onClick={() => dispatch(getText())}>Get</button>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                <label class="form-check-label" for="flexSwitchCheckDefault">Game Mode</label>
            </div>
        </div>
    );
}
