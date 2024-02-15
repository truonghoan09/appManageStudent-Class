import { GET_ALL_STUDENTS_NAME_REQUEST, GET_ALL_STUDENTS_NAME_SUCCESS, GET_ALL_STUDENTS_NAME_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const getAllStudentsNameReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_STUDENTS_NAME_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_STUDENTS_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_ALL_STUDENTS_NAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default getAllStudentsNameReducer;