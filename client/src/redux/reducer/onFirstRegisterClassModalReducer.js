
import { ON_FIRST_REGISTER_CLASS } from "../type";

const initialState = {
    onModal : false
}

const onFirstRegisterClassModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_FIRST_REGISTER_CLASS:
            return {
                ...state,
                onModal: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default onFirstRegisterClassModalReducer;