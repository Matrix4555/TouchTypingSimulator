import {
    GET_TEXT, REPEAT_THE_SAME_TEXT, CHANGE_NUMBER_OF_SENTENCES,
    PAUSE_TIMER, TOGGLE_LOADER, TOGGLE_GAME_MODE
} from './types';

const initialState = {
    text: 'Click the \'Get new text\' button to start',
    numberOfSentences: 1,
    pauseTimer: true,
    loading: false,
    gameMode: false
};

export const textReducer = (state = initialState, action) => {
    switch(action.type) {
    case GET_TEXT:
        return {...state, text: action.payload};
    case REPEAT_THE_SAME_TEXT:
        return {...state, text: state.text.includes('*') ?
            state.text.replace('*', '') :   // an asterisk is need for changing state in the text component
            state.text.concat('*')          // but over time we'll remove it in the component
        };
    case CHANGE_NUMBER_OF_SENTENCES:                
        return {...state, numberOfSentences: action.payload};
    case PAUSE_TIMER:
        return {...state, pauseTimer: action.payload};
    case TOGGLE_LOADER:
        return {...state, loading: action.payload};
    case TOGGLE_GAME_MODE:
        return {...state, gameMode: action.payload};
    default:
        return state;
    }
};
