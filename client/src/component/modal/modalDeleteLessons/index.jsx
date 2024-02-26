import { useEffect, useRef, useState } from "react";
import styles from "./modalDeleteLessons.module.scss";
import { deleteScheduleNextLessonsAction, getUserData, onModalDeleteLessonsAction, onModalNoticeAction, onModalSameTravelTimeAction, onModalUpdateNextLessonsAction, reRenderSameTravelTimeAction, updateScheduleNextLessonsAction } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import ModalTemplate from "../modalTemplate";
import ModalSetSameTravelTime from "../modalSetSameTravelTime";
import ModalTemplateNotice from "../modalTemplateNotice";
import ModalLoading from "../modalLoading";


const ModalDeleteLessons = () => {

    const [homework, setHomework] = useState("");

    const dispatch = useDispatch();

    const closeFunc = () => {
        dispatch(onModalDeleteLessonsAction(false));
    }
    

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    const travelTime = ["00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", "00:35", "00:40", "00:45", "00:50", "00:55", 
    "01:00", "01:05", "01:10", "01:15", "01:20", "01:25", "01:30", "01:35", "01:40", "01:45", "01:50", "01:55", 
    "02:00", "02:05", "02:10", "02:15", "02:20", "02:25", "02:30", "02:35", "02:40", "02:45", "02:50", "02:55", 
    "03:00", "03:05", "03:10", "03:15", "03:20", "03:25", "03:30", "03:35", "03:40", "03:45", "03:50", "03:55", 
    "04:00", "04:05", "04:10", "04:15", "04:20", "04:25", "04:30", "04:35", "04:40", "04:45", "04:50", "04:55", 
    "05:00", "05:05", "05:10", "05:15", "05:20", "05:25", "05:30", "05:35", "05:40", "05:45", "05:50", "05:55", 
    "06:00"]


    const handleChange = async (key, data) => {
        const workInChangeTimesProp = async (i, iv, key) => {
            let cloneNextLessons = [...nextLessons];
            cloneNextLessons.map((v, index) => {
                if(i === index) {
                    cloneNextLessons[index].travelTime = travelTime[iv];
                }
            })
            await setNextLessons(cloneNextLessons);
        }
    
        switch (key) {
                case "travelTime": 
                    workInChangeTimesProp(data.i, data.iv, key)
                    break;
            default:
                break;
        }
    }

    const onModalSameTravelTime = useSelector(state => state.onModalSameTravelTimeReducer.onModal);

    const currentDate = new Date();

    useEffect(() => {
        dispatch(getUserData(localStorage.getItem("uid")));
    }, [])

    const dataState = useSelector(state => state.getUserDataReducer.data.getUserAPIData.data);

    const [preSchedule, setPreSchedule] = useState([]);
    const [deleteOption, setDeleteOption] = useState([])

    useEffect(() => {
        let clonePreSchedule = [...dataState.myClasses[localStorage.getItem('classChoosen')].schedule.nextLessons];
        let cloneDeleteOption = [...deleteOption];
        for (let i = 1; i<= clonePreSchedule.length - cloneDeleteOption.length; i++) {
            cloneDeleteOption.push(false);
        }
        setPreSchedule(clonePreSchedule);
        setDeleteOption(cloneDeleteOption);

    }, [dataState])
    
    const [nextLessonsArr, setNextLessonsArr] = useState([])
    

    useEffect(() => {
        let cloneNextLessonsArr = [];
        if(preSchedule && preSchedule.length > 0) {
            preSchedule.map((v, i) => {
                if(Math.floor(i/5) === cloneNextLessonsArr.length) {
                    cloneNextLessonsArr.push([v]);
                } else {
                    let a = [...cloneNextLessonsArr[Math.floor(i/5)]]
                    cloneNextLessonsArr[Math.floor(i/5)] = [...a ,v]
                }
            })
        }
        setNextLessonsArr(cloneNextLessonsArr);
    }, [preSchedule])


    const [noticeMessage, setNoticeMessage] = useState('');

    const saveFunc = async() => {
        let cloneDeleteOption = [...deleteOption];
        let clonePreSchedule = [...preSchedule];
        
        const deleteData = () => {
            let i = 0;
            while (i < cloneDeleteOption.length) {
                if (cloneDeleteOption[i] === true) {
                    cloneDeleteOption.splice(i,1);
                    clonePreSchedule.splice(i,1);
                } else {
                    i++;
                }
            }
        }
        
        await deleteData(); 
        await dispatch(deleteScheduleNextLessonsAction(localStorage.getItem('uid'), localStorage.getItem('classChoosen'), clonePreSchedule))
        location.reload();
    }


    const loadingDelete = useSelector(state => state.deleteScheduleNextLessonsReducer.loading);

    const handleDelete = (index) => {
        let cloneDeleteOption = [...deleteOption];
        cloneDeleteOption[index] = !cloneDeleteOption[index];
        setDeleteOption(cloneDeleteOption);
    }

    const onModalNotice = useSelector(state => state.onModalNoticeReducer.onModal);

    return(
        <div className={styles.containerElement}>  
            {onModalNotice && <ModalTemplateNotice message={noticeMessage} closeFunc={() => {dispatch(onModalNoticeAction(false))}} />}
            {loadingDelete && <ModalLoading />}
            {nextLessonsArr && 
                <>
                    {
                        nextLessonsArr.map((v, i) => {
                            return(
                                <>
                                    <div className={`${styles.scheduleBlock} ${v.length && styles["numberOfSchedule" + v.length]}`}>
                                        {v.map((v2,i2) => {
                                            let hours = (new Date(v2.date)).getHours()
                                            let minutes = (new Date(v2.date)).getMinutes()
                                            hours = hours < 10 ? '0' + hours : hours;
                                            minutes = minutes < 10 ? '0' + minutes : minutes;
                                            let hoursE = (new Date(v2.dateEnd)).getHours()
                                            let minutesE = (new Date(v2.dateEnd)).getMinutes()
                                            hoursE = hoursE < 10 ? '0' + hoursE : hoursE;
                                            minutesE = minutesE < 10 ? '0' + minutesE : minutesE;
                                            let timeStart = `${hours}:${minutes}`
                                            let timeEnd = `${hoursE}:${minutesE}`

                                            let date = (new Date(v2.date)).getDate(); 
                                            let month = (new Date(v2.date)).getMonth() + 1; 
                                            let year = (new Date(v2.date)).getFullYear(); 
                                            date = date < 10 ? '0' + date : date;
                                            month = month < 10 ? '0' + month : month;
                                            return(
                                                <div className={`${styles.itemSchedule} ${deleteOption[i*5 + i2] && styles.deleted}`}>
                                                    <div className={styles.containerDeleteIcon} onClick={() => {handleDelete(i*5 +i2)}}>
                                                        {!deleteOption[i*5 + i2]? <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-check`} viewBox="0 0 16 16">
                                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                                        </svg>}
                                                    </div>
                                                    <div className={styles.day}>{v2.dayOfWeek}</div>
                                                    <div className={styles.time}>{`${timeStart} - ${timeEnd}`}</div>
                                                    <div className={styles.date}>{`${date}/${month}/${year}`}</div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                    
                </>
            }
            <div className={styles.footer}>
                <div className={styles.exitBtn} onClick={() => {closeFunc()}}>Cancel</div>
                <div className={styles.saveBtn} onClick={() => {saveFunc()}}>Update</div>
            </div>
        </div>
    )
}

export default ModalDeleteLessons;