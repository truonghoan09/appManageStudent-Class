import { ADD_A_STUDENT_FAILURE, ADD_A_STUDENT_REQUEST, ADD_A_STUDENT_SUCCESS } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const addAStudentReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_A_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_A_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case ADD_A_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default addAStudentReducer;