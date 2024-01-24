
import { RE_RENDER_SAME_TRAVEL_TIME } from "../type";

const initialState = {
    reRender : false
}

const reRenderSameTravelTimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case RE_RENDER_SAME_TRAVEL_TIME:
            return {
                ...state,
                reRender: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default reRenderSameTravelTimeReducer;