import { SAVE_A_HOMEWORK_SUCCESS, SAVE_A_HOMEWORK_REQUEST, SAVE_A_HOMEWORK_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const saveAHomeworkReducer = (state = initalState, action) => {
    switch (action.type) {
        case SAVE_A_HOMEWORK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SAVE_A_HOMEWORK_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case SAVE_A_HOMEWORK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default saveAHomeworkReducer;