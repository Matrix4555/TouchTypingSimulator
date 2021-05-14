import { GET_TEXT } from "./types";

export function getText() {
    return async dispatch => {
        const url = 'https://baconipsum.com/api/?type=meat-and-filler&sentences=1&format=text';
        const response = await fetch(url);
        const data = await response.text();
        dispatch({
            type: GET_TEXT,
            payload: data
        });
    }
}
