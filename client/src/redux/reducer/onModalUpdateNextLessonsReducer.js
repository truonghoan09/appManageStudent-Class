
import { ON_MODAL_UPDATE_NEXT_LESSONS } from "../type";

const initialState = {
    onModal : false
}

const onModalUpdateNextLessonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_MODAL_UPDATE_NEXT_LESSONS:
            return {
                ...state,
                onModal: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default onModalUpdateNextLessonsReducer;