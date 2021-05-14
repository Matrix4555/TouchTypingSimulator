import { GET_TEXT } from './types';

const initialState = {
    text: 'Click Get button to start'
}

export const textReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEXT:
            return {text: action.payload};
        default:
            return state;
    }
}
