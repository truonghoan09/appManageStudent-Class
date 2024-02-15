
import { ON_MODAL_NOTICE } from "../type";

const initialState = {
    onModal : false
}

const onModalNoticeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_MODAL_NOTICE:
            return {
                ...state,
                onModal: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default onModalNoticeReducer;