import { getUpdatedAccuracy, getUpdatedSpeed } from '../functions';
import {
    ADD_MISTAKE, SET_NUMBER_OF_CHARS,
    ADD_SECOND, ADD_INPUTTED_CHAR,
    RESET_ACCURACY_AND_SPEED
} from './types';

const initialState = {
    // data for accuracy
    chars: 0,
    mistakes: 0,

    // data for speed
    inputtedChars: 0,
    passedSeconds: 0,

    // counters
    accuracy: 100,
    speed: 0
};

export const indicatorReducer = (state = initialState, action) => {
    switch(action.type) {
        
    // accuracy
    case ADD_MISTAKE:
        return {
            ...state,
            mistakes: state.mistakes + 1,
            accuracy: getUpdatedAccuracy(state.chars, state.mistakes)
        };
    case SET_NUMBER_OF_CHARS:
        return {...state, chars: action.payload};

    // speed
    case ADD_SECOND:
        return {
            ...state,
            passedSeconds: state.passedSeconds + 1,
            speed: getUpdatedSpeed(state.inputtedChars, state.passedSeconds)
        };
    case ADD_INPUTTED_CHAR:
        return {...state, inputtedChars: state.inputtedChars + 1};

    // reset
    case RESET_ACCURACY_AND_SPEED:
        return {
            ...state,
            mistakes: 0,
            accuracy: 100,
            inputtedChars: 0,
            passedSeconds: 0,
            speed: 0
        };
    
    default:
        return state;
    }
};
