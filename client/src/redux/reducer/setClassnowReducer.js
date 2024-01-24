import { SET_CLASSNOW } from "../type";

const classChoosen = localStorage.getItem('classChoosen');
const initialState = {
    class : classChoosen ? classChoosen : "Students and Classes"
}

const setClassnowReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLASSNOW:
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