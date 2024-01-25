import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import setClassnowReducer from "./reducer/setClassnowReducer"
import isSigninReducer from "./reducer/isSigninReducer"
import setDataReducer from "./reducer/setDataReducer"
import onFirstRegisterClassModalReducer from "./reducer/onFirstRegisterClassModalReducer"
import onModalSameTravelTimeReducer from "./reducer/onModalSameTravelTimeReducer"
import sharedTravelTimeReducer from "./reducer/sharedTravelTimeReducer"
import reRenderSameTravelTimeReducer from "./reducer/reRenderSameTravelTimeReducer"
import addAStudentReducer from "./reducer/addAStudentReducer"


const rootReducer = combineReducers({
    setClassnowReducer,
    isSigninReducer,
    setDataReducer,
    onFirstRegisterClassModalReducer,
    onModalSameTravelTimeReducer,
    sharedTravelTimeReducer,
    reRenderSameTravelTimeReducer,
    addAStudentReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;