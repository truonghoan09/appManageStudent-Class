import { SET_CLASSNOW, IS_SIGNIN, SET_DATA, ON_FIRST_REGISTER_CLASS, ON_MODAL_SAME_TRAVEL_TIME, SET_SHARED_TRAVEL_TIME, RE_RENDER_SAME_TRAVEL_TIME, ADD_A_STUDENT_REQUEST, ADD_A_STUDENT_SUCCESS, ADD_A_STUDENT_FAILURE } from "./type"

export const setClassnow  = (classNow) => {
    return({
        type: SET_CLASSNOW,
        payload: classNow,
    })
}

export const isSignin  = (boolean) => {
    return({
        type: IS_SIGNIN,
        payload: boolean,
    })
}

export const setData = (data) => {
    return{
        type: SET_DATA,
        payload: data
    }
}

export const onFirstRegisterClass = (boolean) => {
    return({
        type: ON_FIRST_REGISTER_CLASS,
        payload: boolean,
    })
} 

export const onModalSameTravelTimeAction = (boolean) => {
    return({
        type: ON_MODAL_SAME_TRAVEL_TIME,
        payload: boolean,
    })
} 

export const sharedTravelTimeAction = (str) => {
    return({
        type: SET_SHARED_TRAVEL_TIME,
        payload: str,
    })
} 

export const reRenderSameTravelTimeAction = (boolean) => {
    return({
        type: RE_RENDER_SAME_TRAVEL_TIME,
        payload: boolean,
    })
} 

export const addAStudentAction = (data) => {
	return async (dispatch) => {
        dispatch({type: ADD_A_STUDENT_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/addAStudent", {
                method: 'post',
                body: JSON.stringify({     
                    data: data,
                })
            })
            let responseData = await response.json();
            dispatch({type: ADD_A_STUDENT_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: ADD_A_STUDENT_FAILURE , error: error.message})
        }
    }
};
