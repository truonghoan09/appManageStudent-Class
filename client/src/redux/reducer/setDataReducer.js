import { SET_DATA } from "../type";

const initialState = {
    data: localStorage.getItem('token') ? localStorage.getItem('data') : null,
}
const setDataReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_DATA: {
            localStorage.setItem('data', action.payload);
            return {
                ...state,
                data: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default setDataReducer;