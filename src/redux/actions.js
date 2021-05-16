import { GET_TEXT, TOGGLE_LOADER, SET_NUMBER_OF_LETTERS, ADD_INPUTTED_SYMBOL, ADD_MISTAKE, ADD_SECOND, RESET_MISTAKES, RESET_SPEED, CHANGE_NUMBER_OF_SENTENCES, REPEAT_THE_SAME_TEXT, PAUSE_TIMER } from "./types";
import $ from 'jquery';

export function getText(number) {
    return async dispatch => {

        dispatch(resetMistakes());
        dispatch(resetSpeed());
        dispatch(toggleLoader(true));

        if(number === -1) {     // if an user wants to repeat the same text and write it again
            await dispatch({
                type: REPEAT_THE_SAME_TEXT
            })
            dispatch(toggleLoader(false));
            return;
        }

        $('#btn-get').prop('disabled', true);

        const url = `https://baconipsum.com/api/?type=meat-and-filler&sentences=${number}&format=text`;
        let data;
        try {
            const response = await fetch(url);
            data = await response.text();
        } catch {
            window.$('#danger-modal').modal('show');
            return;
        }
        
        dispatch(setNumberOfLetters(data.length));
        await dispatch({
            type: GET_TEXT,
            payload: data
        });
        dispatch(toggleLoader(false));
        $('#btn-get').prop('disabled', false);
    }
}

export function changeNumberOfSentences(number) {
    return {
        type: CHANGE_NUMBER_OF_SENTENCES,
        payload: number
    }
}

export function pauseTimer(pause) {
    return {
        type: PAUSE_TIMER,
        payload: pause
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

export function addSecond() {
    return {
        type: ADD_SECOND
    };
}

export function addInputtedSymbol() {
    return {
        type: ADD_INPUTTED_SYMBOL
    };
}

export function resetSpeed() {
    return {
        type: RESET_SPEED
    };
}
