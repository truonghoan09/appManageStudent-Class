import { UPDATE_NOTE_SCHEDULE_REQUEST, UPDATE_NOTE_SCHEDULE_SUCCESS, UPDATE_NOTE_SCHEDULE_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const updateNoteScheduleReducer = (state = initalState, action) => {
    switch (action.type) {
        case UPDATE_NOTE_SCHEDULE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_NOTE_SCHEDULE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case UPDATE_NOTE_SCHEDULE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default updateNoteScheduleReducer;