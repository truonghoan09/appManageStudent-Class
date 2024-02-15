import { SET_STUDENT_FROM_MY_STUDENT } from "../type";

const initialState = {
    data : {
        index : -1,
        value : null
    }
}

const setStudentFromMyStudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STUDENT_FROM_MY_STUDENT:
            return {
                ...state,
                data : {
                    index: action.payload.index,
                    value: action.payload.value,
                }
            }
        default: {
            return state;
        }
    }
}

export default setStudentFromMyStudentReducer;