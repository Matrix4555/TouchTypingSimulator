import {
    SET_NUMBER_OF_CHARACTERS, ADD_MISTAKE, RESET_ACCURACY,
    ADD_SECOND, ADD_INPUTTED_CHARACTER, RESET_SPEED
} from './types';

const initialState = {
    // accuracy, data for formula
    characters: 0,
    mistakes: 0,

    // speed, data for formula
    inputtedCharacters: 0,
    passedSeconds: 0
};

export const indicatorReducer = (state = initialState, action) => {
    switch(action.type) {
        
    // accuracy
    case SET_NUMBER_OF_CHARACTERS:
        return {...state, characters: action.payload};
    case ADD_MISTAKE:
        return {...state, mistakes: state.mistakes + 1};
    case RESET_ACCURACY:
        return {...state, mistakes: 0};

    // speed
    case ADD_SECOND:
        return {...state, passedSeconds: state.passedSeconds + 1};
    case ADD_INPUTTED_CHARACTER:
        return {...state, inputtedCharacters: state.inputtedCharacters + 1};
    case RESET_SPEED:
        return {...state, inputtedCharacters: 0, passedSeconds: 0};

    default:
        return state;
    }
};
