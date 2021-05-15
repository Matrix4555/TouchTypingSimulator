import { SET_NUMBER_OF_LETTERS, ADD_MISTAKE, ADD_INPUTTED_LETTER, RESET_MISTAKES, ADD_SECOND, RESET_SPEED } from "./types";

const initialState = {
    // accuracy
    numberOfLetters: 0,
    numberOfMistakes: 0,

    // speed
    numberOfInputtedSymbols: 0,
    numberOfPassedSeconds: 0
}

export const indicatorReducer = (state = initialState, action) => {
    switch(action.type) {

        // accuracy
        case SET_NUMBER_OF_LETTERS:
            return {...state, numberOfLetters: action.payload};
        case ADD_MISTAKE:
            return {...state, numberOfMistakes: state.numberOfMistakes + 1};
        case RESET_MISTAKES:
            return {...state, numberOfMistakes: 0};

        // speed
        case ADD_SECOND:
            return {...state, numberOfPassedSeconds: state.numberOfPassedSeconds + 1};
        case ADD_INPUTTED_LETTER:
            return {...state, numberOfInputtedSymbols: state.numberOfInputtedSymbols + 1};
        case RESET_SPEED:
            return {...state, numberOfInputtedSymbols: 0, numberOfPassedSeconds: 0};

        default:
            return state;
    }
}
