import {
    GET_TEXT, REPEAT_THE_SAME_TEXT, CHANGE_NUMBER_OF_SENTENCES, PAUSE_TIMER, TOGGLE_LOADER, TOGGLE_GAME_MODE,
    SET_NUMBER_OF_CHARACTERS, ADD_MISTAKE, RESET_ACCURACY, ADD_SECOND, ADD_INPUTTED_CHARACTER, RESET_SPEED
} from './types';
import $ from 'jquery';

export function getText(number) {
    return async dispatch => {

        dispatch(resetAccuracy());
        dispatch(resetSpeed());
        dispatch(toggleLoader(true));

        if(number === -1) {     // if an user wants to repeat the same text and write it again
            await dispatch({
                type: REPEAT_THE_SAME_TEXT
            });
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
        
        dispatch(setNumberOfCharacters(data.length));
        await dispatch({
            type: GET_TEXT,
            payload: data
        });
        dispatch(toggleLoader(false));
        $('#btn-get').prop('disabled', false);
    };
}

export function changeNumberOfSentences(number) {
    return {
        type: CHANGE_NUMBER_OF_SENTENCES,
        payload: number
    };
}

export function pauseTimer(pause) {
    return {
        type: PAUSE_TIMER,
        payload: pause
    };
}

export function toggleLoader(show) {
    return {
        type: TOGGLE_LOADER,
        payload: show
    };
}

export function toggleGameMode(turnOn) {
    return {
        type: TOGGLE_GAME_MODE,
        payload: turnOn
    };
}

export function setNumberOfCharacters(number) {
    return {
        type: SET_NUMBER_OF_CHARACTERS,
        payload: number
    };
}

export function addMistake() {
    return {
        type: ADD_MISTAKE
    };
}

export function resetAccuracy() {
    return {
        type: RESET_ACCURACY
    };
}

export function addSecond() {
    return {
        type: ADD_SECOND
    };
}

export function addInputtedSymbol() {
    return {
        type: ADD_INPUTTED_CHARACTER
    };
}

export function resetSpeed() {
    return {
        type: RESET_SPEED
    };
}
