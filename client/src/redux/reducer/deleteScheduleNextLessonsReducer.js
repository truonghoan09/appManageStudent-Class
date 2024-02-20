import { DELETE_SCHEDULE_NEXT_LESSONS_REQUEST, DELETE_SCHEDULE_NEXT_LESSONS_SUCCESS, DELETE_SCHEDULE_NEXT_LESSONS_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const deleteScheduleNextLessonsReducer = (state = initalState, action) => {
    switch (action.type) {
        case DELETE_SCHEDULE_NEXT_LESSONS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_SCHEDULE_NEXT_LESSONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case DELETE_SCHEDULE_NEXT_LESSONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default deleteScheduleNextLessonsReducer;