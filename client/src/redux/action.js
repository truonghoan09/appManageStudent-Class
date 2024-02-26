import { SET_CLASSNOW, IS_SIGNIN, SET_DATA, ON_FIRST_REGISTER_CLASS, 
    ON_MODAL_SAME_TRAVEL_TIME, SET_SHARED_TRAVEL_TIME, RE_RENDER_SAME_TRAVEL_TIME, 
    ADD_STUDENTS_REQUEST, ADD_STUDENTS_SUCCESS, ADD_STUDENTS_FAILURE, 
    GET_ALL_STUDENTS_NAME_REQUEST, GET_ALL_STUDENTS_NAME_SUCCESS, GET_ALL_STUDENTS_NAME_FAILURE, 
    SET_STUDENT_FROM_MY_STUDENT, ON_MODAL_CHOOSE_A_STUDENT_IN_MY_STUDENT, ON_CONFIRM_CHOOSE_STUDENT_FROM_MY_STUDENTS, 
    ADD_CLASS_REQUEST, ADD_CLASS_SUCCESS, ADD_CLASS_FAILURE, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, 
    GET_USER_DATA_FAILURE, ON_MODAL_ADD_HOMEWORK, SAVE_A_HOMEWORK_REQUEST, SAVE_A_HOMEWORK_SUCCESS, 
    SAVE_A_HOMEWORK_FAILURE, UPDATE_NOTE_SCHEDULE_REQUEST, UPDATE_NOTE_SCHEDULE_SUCCESS, 
    UPDATE_NOTE_SCHEDULE_FAILURE, ON_MODAL_UPDATE_NEXT_LESSONS, UPDATE_SCHEDULE_NEXT_LESSONS_REQUEST, 
    UPDATE_SCHEDULE_NEXT_LESSONS_SUCCESS, UPDATE_SCHEDULE_NEXT_LESSONS_FAILURE, 
    UPDATE_SCHEDULE_NEXT_LESSONS_FOLLOW_TODAY_REQUEST, UPDATE_SCHEDULE_NEXT_LESSONS_FOLLOW_TODAY_SUCCESS, 
    UPDATE_SCHEDULE_NEXT_LESSONS_FOLLOW_TODAY_FAILURE, ON_MODAL_NOTICE, ON_DELETE_LESSONS,
    TOOGLE_FIXED_SCHEDULE_REQUEST, TOOGLE_FIXED_SCHEDULE_SUCCESS, TOOGLE_FIXED_SCHEDULE_FAILURE, DELETE_SCHEDULE_NEXT_LESSONS_REQUEST, DELETE_SCHEDULE_NEXT_LESSONS_SUCCESS, DELETE_SCHEDULE_NEXT_LESSONS_FAILURE, ON_MODAL_CONFIRM_DELETION, UPDATE_CLASSES_AFTER_DELETE_REQUEST, UPDATE_CLASSES_AFTER_DELETE_SUCCESS, UPDATE_CLASSES_AFTER_DELETE_FAILURE,
} from "./type"

const uid = localStorage.getItem("uid");

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

export const addStudentsAction = (data) => {
	return async (dispatch) => {
        dispatch({type: ADD_STUDENTS_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/addAStudent", {
                method: 'post',
                body: JSON.stringify({     
                    data: data
                })
            })
            let responseData = await response.json();
            dispatch({type: ADD_STUDENTS_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: ADD_STUDENTS_FAILURE , error: error.message})
        }
    }
};

export const getAllStudentsName = () => {
	return async (dispatch) => {
        dispatch({type: GET_ALL_STUDENTS_NAME_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/getAllStudentsName", {
                method: 'post',
                body: JSON.stringify({
                    uid: localStorage.getItem("uid"),
                })
            })
            let responseData = await response.json();
            dispatch({type: GET_ALL_STUDENTS_NAME_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: GET_ALL_STUDENTS_NAME_FAILURE , error: error.message})
        }
    }
};


export const setStudentFromMyStudent = (index, value) => {
    return({
        type: SET_STUDENT_FROM_MY_STUDENT,
        payload: {index, value},
    })
} 

export const onModalChooseAStudentInMyStudents = (boolean, index) => {
    return({
        type: ON_MODAL_CHOOSE_A_STUDENT_IN_MY_STUDENT,
        payload: {boolean, index} 
    })
} 

export const addClassAction = (id, data) => {
	return async (dispatch) => {
        dispatch({type: ADD_CLASS_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/addClass", {
                method: 'post',
                body: JSON.stringify({     
                    data: {id, data, uid},
                })
            })
            let responseData = await response.json();
            dispatch({type: ADD_CLASS_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: ADD_CLASS_FAILURE , error: error.message})
        }
    }
};

export const getUserData = (uid) => {
	return async (dispatch) => {
        dispatch({type: GET_USER_DATA_REQUEST})
        try {
            const [getUserAPIResponse, calMasterScheduleResponse] = await Promise.all([
                fetch ("http://localhost:8888/.netlify/functions/getUserData", {
                    method: 'post',
                    body: JSON.stringify({     
                        data: uid,
                    })
                }),
                fetch ("http://localhost:8888/.netlify/functions/calMasterSchedule", {
                    method: 'post',
                    body: JSON.stringify({     
                        data: uid,
                    })
                })
            ]) 
            let getUserAPIData = await getUserAPIResponse.json();
            let masterScheduleData = await calMasterScheduleResponse.json();
            dispatch({type: GET_USER_DATA_SUCCESS, payload: {getUserAPIData, masterScheduleData}})
        } catch (error) {
            dispatch({type: GET_USER_DATA_FAILURE , error: error.message})
        }
    }
};

export const onModalAddHomework = (boolean) => {
    return({
        type: ON_MODAL_ADD_HOMEWORK,
        payload: boolean,
    })
} 

export const saveAHomeWorkAction = (uid, idClass, task ) => {
	return async (dispatch) => {
        dispatch({type: SAVE_A_HOMEWORK_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/saveAHomework", {
                method: 'post',
                body: JSON.stringify({     
                    data: {uid, idClass, task}
                })
            })
            let responseData = await response.json();
            dispatch({type: SAVE_A_HOMEWORK_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: SAVE_A_HOMEWORK_FAILURE , error: error.message})
        }
    }
};

export const updateNoteScheduleAction = (uid, idClass, note ) => {
	return async (dispatch) => {
        dispatch({type: UPDATE_NOTE_SCHEDULE_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/updateNoteSchedule", {
                method: 'post',
                body: JSON.stringify({     
                    data: {uid, idClass, note}
                })
            })
            let responseData = await response.json();
            dispatch({type: UPDATE_NOTE_SCHEDULE_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: UPDATE_NOTE_SCHEDULE_FAILURE , error: error.message})
        }
    }
};

export const onModalUpdateNextLessonsAction = (boolean) => {
    return({
        type: ON_MODAL_UPDATE_NEXT_LESSONS,
        payload: boolean,
    })
} 

export const updateScheduleNextLessonsAction = (uid, idClass, nextLessons ) => {
	return async (dispatch) => {
        dispatch({type: UPDATE_SCHEDULE_NEXT_LESSONS_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/updateScheduleNextLessons", {
                method: 'post',
                body: JSON.stringify({     
                    data: {uid, idClass, nextLessons}
                })
            })
            let responseData = await response.json();
            dispatch({type: UPDATE_SCHEDULE_NEXT_LESSONS_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: UPDATE_SCHEDULE_NEXT_LESSONS_FAILURE , error: error.message})
        }
    }
};

export const deleteScheduleNextLessonsAction = (uid, idClass, nextLessons ) => {
	return async (dispatch) => {
        dispatch({type: DELETE_SCHEDULE_NEXT_LESSONS_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/deleteScheduleNextLessons", {
                method: 'post',
                body: JSON.stringify({     
                    data: {uid, idClass, nextLessons}
                })
            })
            let responseData = await response.json();
            dispatch({type: DELETE_SCHEDULE_NEXT_LESSONS_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: DELETE_SCHEDULE_NEXT_LESSONS_FAILURE , error: error.message})
        }
    }
};

export const updateScheduleNextLessonsFollowTodayAction = (uid, idClass, newSchedule) => {
	return async (dispatch) => {
        dispatch({type: UPDATE_SCHEDULE_NEXT_LESSONS_FOLLOW_TODAY_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/updateScheduleNextLessonsFollowToday", {
                method: 'post',
                body: JSON.stringify({     
                    data: {uid, idClass, newSchedule}
                })
            })
            let responseData = await response.json();
            dispatch({type: UPDATE_SCHEDULE_NEXT_LESSONS_FOLLOW_TODAY_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: UPDATE_SCHEDULE_NEXT_LESSONS_FOLLOW_TODAY_FAILURE , error: error.message})
        }
    }
};

export const onModalNoticeAction = (boolean) => {
    return({
        type: ON_MODAL_NOTICE,
        payload: boolean,
    })
} 

export const onModalConfirmDeletion = (boolean) => {
    return({
        type: ON_MODAL_CONFIRM_DELETION,
        payload: boolean,
    })
} 

export const onModalDeleteLessonsAction = (boolean) => {
    return({
        type: ON_DELETE_LESSONS,
        payload: boolean,
    })
} 

export const toogleFixedScheduleAction = (uid, idClass, boolean ) => {
	return async (dispatch) => {
        dispatch({type: TOOGLE_FIXED_SCHEDULE_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/toggleFixedSchedule", {
                method: 'post',
                body: JSON.stringify({     
                    data: {uid, idClass, boolean}
                })
            })
            let responseData = await response.json();
            dispatch({type: TOOGLE_FIXED_SCHEDULE_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: TOOGLE_FIXED_SCHEDULE_FAILURE , error: error.message})
        }
    }
};

export const updateClassesAfterDeletion = (data) => {
	return async (dispatch) => {
        dispatch({type: UPDATE_CLASSES_AFTER_DELETE_REQUEST})
        try {
            let response = await fetch ("http://localhost:8888/.netlify/functions/updateClassesAfterDelete", {
                method: 'post',
                body: JSON.stringify({     
                    data: {data, uid},
                })
            })
            let responseData = await response.json();
            dispatch({type: UPDATE_CLASSES_AFTER_DELETE_SUCCESS, payload: responseData})
        } catch (error) {
            dispatch({type: UPDATE_CLASSES_AFTER_DELETE_FAILURE , error: error.message})
        }
    }
};
