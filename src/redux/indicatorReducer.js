import { SET_NUMBER_OF_LETTERS, ADD_MISTAKE, ADD_SPEED, RESET_MISTAKES } from "./types";

const initialState = {
    numberOfLetters: 0,
    numberOfMistakes: 0,
    speed: 0
}

export const indicatorReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NUMBER_OF_LETTERS:
            return {...state, numberOfLetters: action.payload};
        case ADD_MISTAKE:
            return {...state, numberOfMistakes: state.numberOfMistakes + 1};
        case RESET_MISTAKES:
            return {...state, numberOfMistakes: 0};
        case ADD_SPEED:
            return {...state, speed: state.speed + 1};
        default:
            return state;
    }
}
