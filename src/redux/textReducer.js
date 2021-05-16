import { GET_TEXT, CHANGE_NUMBER_OF_SENTENCES, TOGGLE_LOADER, REPEAT_THE_SAME_TEXT } from './types';

const initialState = {
    text: 'Click Get button to start',
    numberOfSentences: 1,
    loading: false
}

export const textReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEXT:
            return {...state, text: action.payload};
        case REPEAT_THE_SAME_TEXT:
            return {...state, text: state.text + ''};   // doesn't work yet
        case CHANGE_NUMBER_OF_SENTENCES:
            return {...state, numberOfSentences: action.payload};
        case TOGGLE_LOADER:
            return {...state, loading: action.payload};
        default:
            return state;
    }
}
