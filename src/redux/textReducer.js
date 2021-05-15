import { GET_TEXT, TOGGLE_LOADER } from './types';

const initialState = {
    text: 'Click Get button to start',
    loading: false
}

export const textReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEXT:
            return {...state, text: action.payload};
        case TOGGLE_LOADER:
            return {...state, loading: action.payload};
        default:
            return state;
    }
}
