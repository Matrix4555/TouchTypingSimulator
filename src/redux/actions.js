import { GET_TEXT, TOGGLE_LOADER, SET_NUMBER_OF_LETTERS, ADD_MISTAKE, ADD_SPEED, RESET_MISTAKES } from "./types";

export function getText() {
    return async dispatch => {
        dispatch(toggleLoader(true));
        const url = 'https://baconipsum.com/api/?type=meat-and-filler&sentences=1&format=text';
        const response = await fetch(url);
        const data = await response.text();
        dispatch({
            type: GET_TEXT,
            payload: data
        });
        dispatch(setNumberOfLetters(data.length));
        dispatch(resetMistakes());
        dispatch(toggleLoader(false));
    }
}

export function toggleLoader(show) {
    return {
        type: TOGGLE_LOADER,
        payload: show
    };
}

export function setNumberOfLetters(number) {
    return {
        type: SET_NUMBER_OF_LETTERS,
        payload: number
    }
}

export function addMistake() {
    return {
        type: ADD_MISTAKE
    }
}

export function resetMistakes() {
    return {
        type: RESET_MISTAKES
    };
}

export function addSpeed() {
    return {
        type: ADD_SPEED
    };
}
