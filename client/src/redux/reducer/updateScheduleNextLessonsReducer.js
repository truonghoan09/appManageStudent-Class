import { UPDATE_SCHEDULE_NEXT_LESSONS_REQUEST, UPDATE_SCHEDULE_NEXT_LESSONS_SUCCESS, UPDATE_SCHEDULE_NEXT_LESSONS_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const updateScheduleNextLessonsReducer = (state = initalState, action) => {
    switch (action.type) {
        case UPDATE_SCHEDULE_NEXT_LESSONS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_SCHEDULE_NEXT_LESSONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case UPDATE_SCHEDULE_NEXT_LESSONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default updateScheduleNextLessonsReducer;