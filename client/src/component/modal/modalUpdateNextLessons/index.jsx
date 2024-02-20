import { useEffect, useRef, useState } from "react";
import styles from "./modalUpdateNextLessons.module.scss";
import { getUserData, onModalNoticeAction, onModalSameTravelTimeAction, onModalUpdateNextLessonsAction, reRenderSameTravelTimeAction, updateScheduleNextLessonsAction } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import ModalTemplate from "../modalTemplate";
import ModalSetSameTravelTime from "../modalSetSameTravelTime";
import ModalTemplateNotice from "../modalTemplateNotice";


const ModalUpdateNextLessons = () => {

    const [homework, setHomework] = useState("");

    const dispatch = useDispatch();

    const durationTimes = [1, 1.5, 2, 2.5, 3, 3.5, 5.5, 6, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

    const closeFunc = () => {
        dispatch(onModalUpdateNextLessonsAction(false));
    }

    const [redNotice, setRednotice] = useState([false])
    const [redNoticeTravelTime, setRednoticeTravelTime] = useState([false])

    

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    const roundDate = (date) => {
        let seconds = date.getSeconds();
        let milisecond = date.getMilliseconds();
        return new Date(date - seconds*1000 - milisecond);
    }

    const [nextLessons, setNextLessons] = useState([
        {
            dayOfWeek: daysOfWeek[(new Date()).getDay()],
            travelTime: 0,
            date: roundDate(new Date()),
            dateEnd: new Date((roundDate(new Date())).getTime() + 1*60*60*1000),
        }
    ])

    const [value, onChange] = useState([roundDate(new Date())]);
    const [useSharedTravelTime, setUseSharedTravelTime] = useState([false]);

    const changeDate = async(index, valueData) => {
        let cloneNextLessons = [...nextLessons];
        let cloneValue = [...value];
        cloneValue[index] = valueData;
        let cloneRedNotice = [...redNotice];
        let cloneRedNoticeTravelTime = [...redNoticeTravelTime];
        let cloneRedNoticePreSchedule = [...redNoticePreSchedule];
        cloneRedNotice.fill(false);
        cloneRedNoticePreSchedule.fill(false);
        cloneRedNoticeTravelTime.fill(false);
        await onChange(cloneValue);
        cloneNextLessons[index].date = valueData
        cloneNextLessons[index].dayOfWeek = daysOfWeek[valueData.getDay()]
        await setNextLessons(cloneNextLessons);
        await setRednotice(cloneRedNotice);
        await setRednoticeTravelTime(cloneRedNoticeTravelTime);
        await setRednoticePreSchedule(cloneRedNoticePreSchedule);
    }

    
    const handleAddLesson = () => {
        let cloneValue = [...value, new Date()];
        let cloneDurationArr = [...durationArr, 0];
        let cloneUseShareTravelTime = [...useSharedTravelTime, false];
        let cloneNextLessons = [...nextLessons, {dayOfWeek : daysOfWeek[(new Date()).getDay()], date: roundDate(new Date()), dateEnd: new Date((roundDate(new Date())).getTime() + 1*60*60*1000), travelTime: 0}]
        let cloneRedNotice = [...redNotice, false];
        let cloneRedNoticeTravelTime = [...redNoticeTravelTime, false];
        onChange(cloneValue);
        setUseSharedTravelTime(cloneUseShareTravelTime);
        setNextLessons(cloneNextLessons);
        setRednotice(cloneRedNotice);
        setRednoticeTravelTime(cloneRedNoticeTravelTime);
        setDurationArr(cloneDurationArr);
    }
    
    const handleDeleteALesson = () => {
        let cloneValue = [...value];
        let cloneDurationArr = [...durationArr];
        let cloneUseShareTravelTime = [...useSharedTravelTime, false];
        let cloneNextLessons = [...nextLessons, {dayOfWeek : daysOfWeek[(new Date()).getDay], date: new Date(), travelTime: "00:00"}]
        let cloneRedNotice = [...redNotice];
        let cloneRedNoticeTravelTime = [...redNoticeTravelTime];
        let lastIndex = cloneValue.length - 1;
        if(lastIndex > 0) {
            cloneValue.splice(lastIndex, 1);
            cloneUseShareTravelTime.splice(lastIndex, 1);
            cloneNextLessons.splice(lastIndex, 1);
            cloneRedNotice.splice(lastIndex, 1);
            cloneRedNoticeTravelTime.splice(lastIndex, 1);
            cloneDurationArr.splice(lastIndex, 1);
        }
        onChange(cloneValue);
        setUseSharedTravelTime(cloneUseShareTravelTime);
        setNextLessons(cloneNextLessons);
        setRednotice(cloneRedNotice);
        setDurationArr(cloneDurationArr);
        setRednoticeTravelTime(cloneRedNoticeTravelTime);
    }

    const travelTime = ["00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", "00:35", "00:40", "00:45", "00:50", "00:55", 
    "01:00", "01:05", "01:10", "01:15", "01:20", "01:25", "01:30", "01:35", "01:40", "01:45", "01:50", "01:55", 
    "02:00", "02:05", "02:10", "02:15", "02:20", "02:25", "02:30", "02:35", "02:40", "02:45", "02:50", "02:55", 
    "03:00", "03:05", "03:10", "03:15", "03:20", "03:25", "03:30", "03:35", "03:40", "03:45", "03:50", "03:55", 
    "04:00", "04:05", "04:10", "04:15", "04:20", "04:25", "04:30", "04:35", "04:40", "04:45", "04:50", "04:55", 
    "05:00", "05:05", "05:10", "05:15", "05:20", "05:25", "05:30", "05:35", "05:40", "05:45", "05:50", "05:55", 
    "06:00"]

    const takeValue = (key, index) => {
        switch (key) {
            case "duration": 
                return(durationTimes[index]);
        
            case "travelTime": 
                //return milisecond của travel time
                return(index*5*60*1000);
        
            default:
                break;
        }
    }

    const [durationArr, setDurationArr] = useState([0])

    const handleChange = async (key, data) => {
        //data gồm: i, iv, trong đó i là vị trí của lesson bị thay đổi, iv là vị trí trong mảng giá trị của key
        const workInChangeTimesProp = async (i, iv, key) => {
            let cloneNextLessons = [...nextLessons];
            cloneNextLessons.map((v, index) => {
                if(i === index) {
                    let cloneRedNotice = [...redNotice];
                    let cloneRedNoticeTravelTime = [...redNoticeTravelTime];
                    let cloneRedNoticePreSchedule = [...redNoticePreSchedule];
                    cloneRedNotice[i] = false;
                    cloneRedNoticeTravelTime[i] = false;
                    cloneRedNoticePreSchedule[i] = false;
                    setRednotice(cloneRedNotice);
                    setRednoticeTravelTime(cloneRedNoticeTravelTime);
                    setRednoticePreSchedule(cloneRedNoticePreSchedule);                    
                    switch (key) {
                        case "duration":
                            const duration = takeValue(key, iv);
                            let cloneDurationArr = [...durationArr];
                            cloneDurationArr[index] = iv;
                            setDurationArr(cloneDurationArr)
                            //dataNeedSet sẽ trả về duration rồi mình dựa vào đó để tính ra dateEnd
                            cloneNextLessons[index].dateEnd = new Date(v.date.getTime() + duration*60*60*1000);
                            break;
                            case "travelTime":
                            const dataNeedSet = takeValue(key, iv);
                            cloneNextLessons[index].travelTime = dataNeedSet;
                            break;
                    
                        default:
                            break;
                    }
                }
            })
            await setNextLessons(cloneNextLessons);
        }
    
        switch (key) {
                case "travelTime": 
                    workInChangeTimesProp(data.i, data.iv, key)
                    break;
                case "duration": 
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

    const dataState = useSelector(state => state.getUserDataReducer.data.data);

    const [preSchedule, setPreSchedule] = useState([]);

    useEffect(() => {
        if(dataState.myClasses[localStorage.getItem('classChoosen')].schedule.nextLessons) {
            let clonePreSchedule = [...dataState.myClasses[localStorage.getItem('classChoosen')].schedule.nextLessons];
            setPreSchedule(clonePreSchedule);
        }
    }, [dataState])

    const [nextLessonsArr, setNextLessonsArr] = useState([])

    useEffect(() => {
        let cloneNextLessonsArr = [];
        if(preSchedule && preSchedule.length > 0) {
            preSchedule.map((v, i) => {
                if(Math.floor(i/3) === cloneNextLessonsArr.length) {
                    cloneNextLessonsArr.push([v]);
                } else {
                    let a = [...cloneNextLessonsArr[Math.floor(i/3)]]
                    cloneNextLessonsArr[Math.floor(i/3)] = [...a ,v]
                }
            })
        }
        setNextLessonsArr(cloneNextLessonsArr);
    }, [preSchedule])

    const [redNoticePreSchedule, setRednoticePreSchedule] = useState([...Array(preSchedule.length).fill(false)])

    const [noticeMessage, setNoticeMessage] = useState('');

    const saveFunc = async() => {
        let cloneRedNotice = [...redNotice];
        let cloneNextLessons = [...nextLessons];
        let cloneRedNoticeTravelTime = [...redNoticeTravelTime];
        let cloneRedNoticePreSchedule = [...redNoticePreSchedule];
        cloneNextLessons.map((v,i) => {
            let now = new Date();
            preSchedule.map((vSnap, iSnap) => {
                if (v.dateEnd.getTime() > ((new Date(vSnap.date)).getTime() - vSnap.travelTime) && v.date.getTime()-v.travelTime < (new Date(vSnap.dateEnd)).getTime()) {
                    cloneRedNotice[i] = true
                    cloneRedNoticePreSchedule[iSnap] = true;
                }
            })
            for (let j = i + 1 ; j<cloneNextLessons.length; j++) {
                if (v.dateEnd && v.date && nextLessons[j] && v.dateEnd > nextLessons[j].date - nextLessons[j].travelTime && v.date - v.travelTime < nextLessons[j].dateEnd) {
                    cloneRedNotice[i] = true;
                    cloneRedNotice[j] = true;
                }
            }
            if(dataState.myClasses[localStorage.getItem('classChoosen')].schedule.lessonAtNow) {
                let lessonAtNow = dataState.myClasses[localStorage.getItem('classChoosen')].schedule.lessonAtNow;
                if(((v.date >= new Date(lessonAtNow.date)) && (v.date < new Date(lessonAtNow.dateEnd))) || ((v.dateEnd > new Date(lessonAtNow.date)) && ((v.dateEnd) <= new Date(lessonAtNow.dateEnd)))) {
                    console.log('dô lesson at now check')
                    cloneRedNotice[i] = true;
                } else {
                    if(v.date - v.travelTime >= new Date(lessonAtNow.date) && v.date - v.travelTime < new Date(lessonAtNow.dateEnd) ) {
                        cloneRedNoticeTravelTime[i] = true
                    }
                }
            }
            console.log('((cloneNextLessons[i].date - cloneNextLessons[i].travelTime) < now): ',((cloneNextLessons[i].date - cloneNextLessons[i].travelTime) < now) )
            if(cloneNextLessons[i].date < now) {
                cloneRedNotice[i] = true;
            } else {
                if(((cloneNextLessons[i].date - cloneNextLessons[i].travelTime) < now)) {
                    cloneRedNoticeTravelTime[i] = true;
                }
            }
        })
        await setRednotice(cloneRedNotice);
        await setRednoticePreSchedule(cloneRedNoticePreSchedule);
        await setRednoticeTravelTime(cloneRedNoticeTravelTime);
        if (cloneRedNoticePreSchedule.indexOf(true) === -1 && cloneRedNotice.indexOf(true) === -1 && cloneRedNoticeTravelTime.indexOf(true) === -1) {
                dispatch(updateScheduleNextLessonsAction(localStorage.getItem("uid"), localStorage.getItem("classChoosen"), nextLessons))
                dispatch(onModalUpdateNextLessonsAction(false))
                location.reload();
        } else {
            setNoticeMessage('You cannot select time slots that overlap with saved classes or times in the past!');
            dispatch(onModalNoticeAction(true));
        }
        
    }

    const sharedTravelTime = useSelector(state => state.sharedTravelTimeReducer.time);

    const reRenderSameTravelTime = useSelector(state => state.reRenderSameTravelTimeReducer.reRender);

   

    useEffect(() => {
        if(sharedTravelTime !== "" && reRenderSameTravelTime) {
            let cloneNextLessons = [...nextLessons] 
            let cloneUseShareTravelTime  = [...useSharedTravelTime]
            cloneNextLessons.map((v, i) => {
                v.travelTime = sharedTravelTime;
                cloneUseShareTravelTime[i] = true;
            })
            setNextLessons(cloneNextLessons);
            setUseSharedTravelTime(cloneUseShareTravelTime);
            dispatch(reRenderSameTravelTimeAction(false));
        }
    },  [sharedTravelTime, reRenderSameTravelTime])


    const handleEditTravelTime = (index) => {
        let cloneUseSharedTravelTimeArr = [...useSharedTravelTime];
        let cloneNextLessons = [...nextLessons];
        cloneNextLessons[index].travelTime = "00:00";
        cloneUseSharedTravelTimeArr[index] = false;
        setUseSharedTravelTime(cloneUseSharedTravelTimeArr);
        setNextLessons(cloneNextLessons);
    }

    const onModalNotice = useSelector(state => state.onModalNoticeReducer.onModal);

    return(
        <>  
            {onModalSameTravelTime && <ModalTemplate element={<ModalSetSameTravelTime/>}/>}
            {onModalNotice && <ModalTemplateNotice message={noticeMessage} closeFunc={() => {dispatch(onModalNoticeAction(false))}} />}
            <div className={styles.containerElement}>
            <div className={styles.numberOfLessons}>
                <div className={styles.fluctuate} onClick={() => {handleDeleteALesson()}}>-</div>
                <div>Number of Lessons:</div>
                <div>{value.length}</div>
                <div className={styles.fluctuate} onClick={() => {handleAddLesson()}}>+</div>
            </div>
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
                                            let date = (new Date(v2.date)).getDate(); 
                                            let month = (new Date(v2.date)).getMonth() + 1; 
                                            let year = (new Date(v2.date)).getFullYear(); 
                                            date = date < 10 ? '0' + date : date;
                                            month = month < 10 ? '0' + month : month;
                                            let timeStart = `${hours}:${minutes}`
                                            let timeEnd = `${hoursE}:${minutesE}`
                                            return(
                                                <div className={`${styles.itemSchedule} ${redNoticePreSchedule[i*5 + i2] && styles.redNotice}`}>
                                                    <div className={styles.day}>{v2.dayOfWeek}</div>
                                                    <div className={styles.time}>{`${timeStart} - ${timeEnd}`}</div>
                                                    <div className={styles.date}>{`${date}/${month}/${year}`}</div>
                                                    <div className={styles.date}>{`Travel Times: ${(v2.travelTime !== 0) ? travelTime[v2.travelTime/1000/60/5] : v2.travelTime}`}</div>
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
            <div onClick={() => {dispatch(onModalSameTravelTimeAction(true))}} className={styles.linkToModal}>
                Set the same travel time for all lessons.
            </div>

            
            {value.map((v, i) => {
                return(
                    <>
                        <div className={styles.containerBlockDayChoosen}>
                            <div className={styles.blockChooseDay}>
                                <div className={styles.dayOfWeek}>{daysOfWeek[v.getDay()]}</div>
                                <div className={`${styles.pickTimeTag} ${redNotice[i] && styles.redNotice}`}>
                                    <DateTimePicker format="dd/MM/yyyy hh:mm a" clearIcon={null}  minDate={currentDate} disableClock onChange={async (value) => {await changeDate(i, value); await handleChange("duration", {i : i, iv : durationArr[i]})}} value={v} />
                                </div>
                            </div>
                            {!useSharedTravelTime[i] ? 
                                <>
                                    <div className={styles.content}>You can change commute time to the teaching location if you wish.</div>
                                    <div className={redNoticeTravelTime[i] && styles.redNotice}>
                                        <select
                                            onChange={(e) => {
                                                handleChange("travelTime", {i : i, iv : e.target.selectedIndex})
                                            }}>
                                            {travelTime.map((v,i) => {
                                                return(
                                                    <option key={v} value={i}>{v}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                </> :
                                <>
                                    <div className={styles.content}>The travel time is:</div>
                                    <div className={styles.blockTravelTime}>
                                        <div>{travelTime[sharedTravelTime/(5*60*1000)]}</div> 
                                        <div onClick={() => {handleEditTravelTime(i)}} className={styles.editBtn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                            </svg> 
                                            Edit
                                        </div>
                                    </div>
                                </>
                            }
                            <div>Duration of the lesson:</div>
                            <div className={styles.blockDurations}>
                                <select className={i} onChange={(e) => {
                                    handleChange("duration", {i : i ,iv : e.target.selectedIndex})
                                }}>
                                    {durationTimes.map((v, i) => {
                                        return(
                                                <option key={i} value={i}>{v}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div> hours</div>
                            </div>
                        </div>
                    </>
                )
            })}
                {/* <div className={styles.blockInput}>
                    <div className={styles.blockLable}>
                        <div>Exercise: </div>
                    </div>
                    <input onFocus={() => {setRednotice(false)}} className={redNotice ? styles.redNotice : ""} placeholder="Enter a Exercise" onChange={(e) => {setHomework(e.target.value)}}/>
                </div> */}
                

                <div className={styles.footer}>
                    <div className={styles.exitBtn} onClick={() => {closeFunc()}}>Cancel</div>
                    <div className={styles.saveBtn} onClick={() => {saveFunc()}}>Save</div>
                </div>
            </div>
        </>
    )
}

export default ModalUpdateNextLessons;