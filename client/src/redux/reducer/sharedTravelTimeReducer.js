
import { SET_SHARED_TRAVEL_TIME } from "../type";

const initialState = {
    time : '',
}

const sharedTravelTimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHARED_TRAVEL_TIME:
            return {
                ...state,
                time: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default sharedTravelTimeReducer;