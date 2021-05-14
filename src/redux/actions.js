import { GET_TEXT } from "./types";

export function getText() {
    return async dispatch => {
        const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&format=text');
        const data = await response.text();
        dispatch({
            type: GET_TEXT,
            payload: data
        });
    }
}
