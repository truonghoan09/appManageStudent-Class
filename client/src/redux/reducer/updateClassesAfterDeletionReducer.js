import { UPDATE_CLASSES_AFTER_DELETE_REQUEST, UPDATE_CLASSES_AFTER_DELETE_SUCCESS, UPDATE_CLASSES_AFTER_DELETE_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const updateClassesAfterDeletionReducer = (state = initalState, action) => {
    switch (action.type) {
        case UPDATE_CLASSES_AFTER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_CLASSES_AFTER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case UPDATE_CLASSES_AFTER_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default updateClassesAfterDeletionReducer;