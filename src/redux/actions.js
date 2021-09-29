import {
    GET_TEXT, REPEAT_THE_SAME_TEXT, CHANGE_NUMBER_OF_SENTENCES, PAUSE_TIMER, TOGGLE_LOADER, TOGGLE_GAME_MODE,
    ADD_MISTAKE, SET_NUMBER_OF_CHARS, ADD_SECOND, ADD_INPUTTED_CHAR, RESET_ACCURACY_AND_SPEED
} from './types';

export function getText() {
    return (dispatch, getState) => {

        const number = getState().text.numberOfSentences;
        const url = `https://baconipsum.com/api/?type=meat-and-filler&sentences=${number}&format=text`;

        dispatch(resetAccuracyAndSpeed());
        dispatch(toggleLoader(true));

        return new Promise((enableGetTextBtn, showDangerModalAboutDisconnection) => {
            fetch(url)
                .then(async response => {
                    const data = await response.text();
                    dispatch({
                        type: GET_TEXT,
                        payload: data
                    });
                    dispatch(setNumberOfChars(data.length));
                    dispatch(toggleLoader(false));
                    enableGetTextBtn();
                })
                .catch(() => showDangerModalAboutDisconnection());
        });
    };
}

export function repeatTheSameText() {
    return (dispatch, getState) => {

        let text = getState().text.text;
        // we should add or remove an asterisk because we need new text anyway for rerender of TextContainer component
        // if we add the asterisk then it will be removed later
        text = text.includes('*') ?
            text.replace('*', '') :
            text.concat('*');

        dispatch(resetAccuracyAndSpeed());
        dispatch({
            type: REPEAT_THE_SAME_TEXT,
            payload: text
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

export function toggleLoader(shouldShow) {
    return {
        type: TOGGLE_LOADER,
        payload: shouldShow
    };
}

export function toggleGameMode(shouldTurnOn) {
    return {
        type: TOGGLE_GAME_MODE,
        payload: shouldTurnOn
    };
}

export function addMistake() {
    return{
        type: ADD_MISTAKE
    };
}

export function setNumberOfChars(number) {
    return {
        type: SET_NUMBER_OF_CHARS,
        payload: number
    };
}

export function addSecond() {
    return (dispatch, getState) => {
        const pause = getState().text.pause;
        if(!pause)
            dispatch({ type: ADD_SECOND });
    };
}

export function addInputtedChar() {
    return {
        type: ADD_INPUTTED_CHAR
    };
}

export function resetAccuracyAndSpeed() {
    return {
        type: RESET_ACCURACY_AND_SPEED
    };
}
