import { ADD_STUDENTS_FAILURE, ADD_STUDENTS_REQUEST, ADD_STUDENTS_SUCCESS } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const addStudentsReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_STUDENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case ADD_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default addStudentsReducer;