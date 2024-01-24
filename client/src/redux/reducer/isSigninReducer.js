import { IS_SIGNIN } from "../type";

const initialState = {
    isSignin : false
}

const isSigninReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_SIGNIN:
            return {
                ...state,
                isSignin: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default isSigninReducer;