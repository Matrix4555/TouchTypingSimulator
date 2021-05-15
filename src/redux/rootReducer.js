import { combineReducers } from 'redux';
import { textReducer } from './textReducer';
import { indicatorReducer } from './indicatorReducer';

export const rootReducer = combineReducers({
    text: textReducer,
    indicator: indicatorReducer
});
