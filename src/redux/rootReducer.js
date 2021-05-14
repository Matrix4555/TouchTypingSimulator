import { combineReducers } from 'redux';
import { textReducer } from './textReducer';

export const rootReducer = combineReducers({
    text: textReducer
});
