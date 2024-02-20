import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import setClassnowReducer from "./reducer/setClassnowReducer"
import isSigninReducer from "./reducer/isSigninReducer"
import setDataReducer from "./reducer/setDataReducer"
import onFirstRegisterClassModalReducer from "./reducer/onFirstRegisterClassModalReducer"
import onModalSameTravelTimeReducer from "./reducer/onModalSameTravelTimeReducer"
import sharedTravelTimeReducer from "./reducer/sharedTravelTimeReducer"
import reRenderSameTravelTimeReducer from "./reducer/reRenderSameTravelTimeReducer"
import addStudentsReducer from "./reducer/addStudentsReducer"
import getAllStudentsNameReducer from "./reducer/getAllStudentsNameReducer"
import setStudentFromMyStudentReducer from "./reducer/setStudentFromMyStudentReducer"
import onModalChooseAStudentInMyStudentReducer from "./reducer/onModalChooseAStudentInMyStudentReducer"
import addClassReducer from "./reducer/addClassReducer"
import getUserDataReducer from "./reducer/getUserDataReducer"
import onModalAddHomeworkReducer from "./reducer/onModalAddHomeworkReducer"
import saveAHomeworkReducer from "./reducer/saveAHomeworkReducer"
import updateNoteScheduleReducer from "./reducer/updateNoteScheduleReducer"
import onModalUpdateNextLessonsReducer from "./reducer/onModalUpdateNextLessonsReducer"
import updateScheduleNextLessonsReducer from "./reducer/updateScheduleNextLessonsReducer"
import onModalNoticeReducer from "./reducer/onModalNoticeReducer"
import onModalDeleteLessonsReducer from "./reducer/onModalDeleteLessonsReducer"
import toggleFixedScheduleReducer from "./reducer/toggleFixedScheduleReducer"
import deleteScheduleNextLessonsReducer from "./reducer/deleteScheduleNextLessonsReducer"
import onModalConfirmDeletionReducer from "./reducer/onModalConfirmDeletionReducer"
import updateClassesAfterDeletionReducer from "./reducer/updateClassesAfterDeletionReducer"


const rootReducer = combineReducers({
    setClassnowReducer,
    isSigninReducer,
    setDataReducer,
    onFirstRegisterClassModalReducer,
    onModalSameTravelTimeReducer,
    sharedTravelTimeReducer,
    reRenderSameTravelTimeReducer,
    addStudentsReducer,
    getAllStudentsNameReducer,
    setStudentFromMyStudentReducer,
    onModalChooseAStudentInMyStudentReducer,
    addClassReducer,
    getUserDataReducer,
    onModalAddHomeworkReducer,
    saveAHomeworkReducer,
    updateNoteScheduleReducer,
    onModalUpdateNextLessonsReducer,
    updateScheduleNextLessonsReducer,
    onModalNoticeReducer,
    onModalDeleteLessonsReducer,
    toggleFixedScheduleReducer,
    deleteScheduleNextLessonsReducer,
    onModalConfirmDeletionReducer,
    updateClassesAfterDeletionReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;