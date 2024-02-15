
import { ON_DELETE_LESSONS } from "../type";

const initialState = {
    onModal : false
}

const onModalDeleteLessonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_DELETE_LESSONS:
            return {
                ...state,
                onModal: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default onModalDeleteLessonsReducer;