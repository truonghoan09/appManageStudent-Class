import { ADD_CLASS_REQUEST, ADD_CLASS_SUCCESS, ADD_CLASS_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const addClassReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_CLASS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_CLASS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case ADD_CLASS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default addClassReducer;