
import { ON_MODAL_SAME_TRAVEL_TIME } from "../type";

const initialState = {
    onModal : false
}

const onModalSameTravelTimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_MODAL_SAME_TRAVEL_TIME:
            return {
                ...state,
                onModal: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default onModalSameTravelTimeReducer;