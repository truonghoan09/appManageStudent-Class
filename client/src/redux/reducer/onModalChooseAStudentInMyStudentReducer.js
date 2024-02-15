
import { ON_MODAL_CHOOSE_A_STUDENT_IN_MY_STUDENT } from "../type";

const initialState = {
    onModal : false,
    // indexToChoose : -1
}

const onModalChooseAStudentInMyStudentReducer = (state = initialState, action) => {
    
    
    switch (action.type) {
        case ON_MODAL_CHOOSE_A_STUDENT_IN_MY_STUDENT:
            let valueOnModal = action.payload.boolean;
            let valueIndex = action.payload.index;
            return {
                ...state,
                onModal: valueOnModal,
                indexToChoose: valueIndex
            }
        default: {
            return state;
        }
    }
}

export default onModalChooseAStudentInMyStudentReducer;