
import { ON_MODAL_CONFIRM_DELETION } from "../type";

const initialState = {
    onModal : false
}

const onModalConfirmDeletionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_MODAL_CONFIRM_DELETION:
            return {
                ...state,
                onModal: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default onModalConfirmDeletionReducer;