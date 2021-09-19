import {
    GET_TEXT, REPEAT_THE_SAME_TEXT, CHANGE_NUMBER_OF_SENTENCES, PAUSE_TIMER, TOGGLE_LOADER, TOGGLE_GAME_MODE,
    ADD_MISTAKE, SET_NUMBER_OF_CHARACTERS, RESET_ACCURACY, ADD_SECOND, ADD_INPUTTED_CHARACTER, RESET_SPEED
} from './types';

export function getText(number) {
    return async dispatch => {

        dispatch(resetAccuracy());
        dispatch(resetSpeed());
        dispatch(toggleLoader(true));

        // if an user wants to repeat the same text and write it again
        if(number === -1) {
            await dispatch({ type: REPEAT_THE_SAME_TEXT });
            dispatch(toggleLoader(false));
            return;
        }

        return new Promise((res, rej) => {
            const url = `https://baconipsum.com/api/?type=meat-and-filler&sentences=${number}&format=text`;
            fetch(url)
                .then(response => {
                    response.text()
                        .then(data => {
                            dispatch({
                                type: GET_TEXT,
                                payload: data
                            });
                            dispatch(setNumberOfCharacters(data.length));
                            dispatch(toggleLoader(false));
                            res();
                        });
                })
                .catch(() => rej());
        });
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

export function addMistake() {
    return{
        type: ADD_MISTAKE
    };
}

export function setNumberOfCharacters(number) {
    return {
        type: SET_NUMBER_OF_CHARACTERS,
        payload: number
    };
}

export function resetAccuracy() {
    return {
        type: RESET_ACCURACY
    };
}

export function addSecond() {
    return (dispatch, getState) => {
        const pause = getState().text.pause;
        if(!pause)
            dispatch({ type: ADD_SECOND });
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
