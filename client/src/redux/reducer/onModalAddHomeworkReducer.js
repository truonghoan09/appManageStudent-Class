
import { ON_MODAL_ADD_HOMEWORK } from "../type";

const initialState = {
    onModal : false
}

const onModalAddHomeworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_MODAL_ADD_HOMEWORK:
            return {
                ...state,
                onModal: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default onModalAddHomeworkReducer;