import { SET_CLASSNOW } from "../type";

const classChoosen = localStorage.getItem('classChoosen');
const uid = localStorage.getItem('uid');
const initialState = {
    class : classChoosen ? classChoosen : uid ? "Login" : null
}

const setClassnowReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLASSNOW:
            localStorage.setItem("classChoosen", action.payload)
            return {
                ...state,
                classNow: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default setClassnowReducer;