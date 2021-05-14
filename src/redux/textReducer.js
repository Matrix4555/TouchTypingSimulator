import { GET_TEXT } from './types';

const initialState = {
    text: 'Sorry. Here is empty'
}

export const textReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEXT:
            return {text: action.payload};
        default:
            return state;
    }
}
