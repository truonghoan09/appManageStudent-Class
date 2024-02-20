import { TOOGLE_FIXED_SCHEDULE_REQUEST, TOOGLE_FIXED_SCHEDULE_SUCCESS, TOOGLE_FIXED_SCHEDULE_FAILURE } from "../type";

const initalState = {
    loading: false,
    data: null,
    error: null
};

const toggleFixedScheduleReducer = (state = initalState, action) => {
    switch (action.type) {
        case TOOGLE_FIXED_SCHEDULE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TOOGLE_FIXED_SCHEDULE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case TOOGLE_FIXED_SCHEDULE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default toggleFixedScheduleReducer;