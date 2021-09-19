import {
    ADD_MISTAKE, SET_NUMBER_OF_CHARACTERS, RESET_ACCURACY,
    ADD_SECOND, ADD_INPUTTED_CHARACTER, RESET_SPEED
} from './types';

const initialState = {
    // accuracy, data for formula
    characters: 0,
    mistakes: 0,

    // speed, data for formula
    inputtedCharacters: 0,
    passedSeconds: 0,

    // counters
    accuracy: 100,
    speed: 0
};

export const indicatorReducer = (state = initialState, action) => {
    switch(action.type) {
        
    // accuracy
    case ADD_MISTAKE:
        let accuracy = (state.characters - (state.mistakes + 1)) / state.characters * 100;
        accuracy = accuracy.toFixed(2);
        return {...state, mistakes: state.mistakes + 1, accuracy};
    case SET_NUMBER_OF_CHARACTERS:
        return {...state, characters: action.payload};
    case RESET_ACCURACY:
        return {...state, mistakes: 0, accuracy: 100};

    // speed
    case ADD_SECOND:
        let speed = state.inputtedCharacters * 60 / (state.passedSeconds + 1);
        speed = speed.toFixed(0);
        return {...state, passedSeconds: state.passedSeconds + 1, speed};
    case ADD_INPUTTED_CHARACTER:
        return {...state, inputtedCharacters: state.inputtedCharacters + 1};
    case RESET_SPEED:
        return {...state, inputtedCharacters: 0, passedSeconds: 0, speed: 0};

    default:
        return state;
    }
};
