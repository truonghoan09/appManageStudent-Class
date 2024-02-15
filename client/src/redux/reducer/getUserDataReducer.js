import { GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const getUserDataReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_USER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default getUserDataReducer;