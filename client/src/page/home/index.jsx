import { useEffect, useRef, useState } from 'react';
import styles from './home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, onModalAddHomework, onModalDeleteLessonsAction, onModalUpdateNextLessonsAction, setClassnow, toogleFixedScheduleAction, updateNoteScheduleAction, updateScheduleNextLessonsFollowTodayAction } from '../../redux/action';
import getFristClass from '../../module/getFirstClass';
import getClassFollowClassNow from '../../module/getClassFollowClassNow';
import ModalAddHomework from '../../component/modal/modalAddHomework';
import ModalTemplate2 from '../../component/modal/modalTemplate2';
import ModalUpdateNextLessons from '../../component/modal/modalUpdateNextLessons';
import ModalDeleteLessons from '../../component/modal/modalDeleteLessons';
import ModalTemplate from '../../component/modal/modalTemplate';
import ModalLoading from '../../component/modal/modalLoading';
import caculateLessonRealtime from '../../module/caculateLessonRealtime';
import enRouteGif from "../../assets/enRoute.gif";
import learningGif from "../../assets/learning.gif";
import { Link } from 'react-router-dom';
import DatePickerComponent from '../../component/calendar';
import PickTimesAndDate from '../../component/pickTimesAndDate';


const Home = () => {
    const [dataClassNow, setDataClassNow] = useState()
    const dispatch = useDispatch();

    const getUserDataFunc = () => {
        // define dataState
        const uid = localStorage.getItem("uid");
        if(uid) {
            dispatch(getUserData(uid));
        }
    }

    useEffect(() => {
        getUserDataFunc();
    }, []);

    const classNow = useSelector(state => state.setClassnowReducer.class);
    const dataState = useSelector(state => state.getUserDataReducer.data.getUserAPIData);


    useEffect(() => {
        const fetchData = async (id) => {
            if(id === -1) {
                const firstClassId = await getFristClass(dataState.data);
                await dispatch(setClassnow(firstClassId));
                await localStorage.setItem("classChoosen", firstClassId);
                location.reload();
            } else {
                const classFollowClassNow = await getClassFollowClassNow(dataState.data, id) 
                await setDataClassNow(classFollowClassNow);
            }
        }
        
        if(classNow && dataState) {
            //trường hợp này classNow khác null <=> đã signin, hoặc đã signin và đã chọn lớp luôn
            if(classNow === "Login") {
                //trường hợp này nghĩa là login rồi nhưng chưa chọn lớp nào, vậy thì mình cứ lấy data
                fetchData(-1);
                //trường hợp này sẽ có reload để update choosenClass trong localStorage để fetch lại theo classNow
            } else {
                //trường hợp này nghĩa là có classNow rồi, cần lấy data 1 lần
                fetchData(classNow);
            }
        }
    }, [classNow, dataState])
    
    const onModalAddHomeworkState = useSelector(state => state.onModalAddHomeworkReducer.onModal);


    const [noClass, setNoClass] = useState(false);

    const [noteContent, setNoteContent] = useState('');
    const [editNote, setEditNote] = useState(false);

    useEffect(() => {
        if(dataState && dataState.data && (dataState.data.myClasses === "" || dataState.data.myClasses === undefined)){
            setTimeout(() => {
                setNoClass(true); 
                localStorage.removeItem('classChoosen');
            }, 5000);
        } else { 
            setNoClass(false)
        }
    }, [dataState, classNow])

    const handleSaveNote = async () => {
        await dispatch(updateNoteScheduleAction(localStorage.getItem("uid"), localStorage.getItem("classChoosen"), noteContent));
        location.reload();
    }

    const onModalUpdateNextLessons = useSelector(state => state.onModalUpdateNextLessonsReducer.onModal)

    const handleClickUpdateNextLessons = () => {
        dispatch(onModalUpdateNextLessonsAction(true));
    }

    const [nextLessonsArr, setNextLessonsArr] = useState([])

    useEffect(() => {
        let cloneNextLessonsArr = [];
        if(dataClassNow && dataClassNow.schedule.nextLessons && dataClassNow.schedule.nextLessons.length > 0) {
            dataClassNow.schedule.nextLessons.map((v, i) => {
                if(Math.floor(i/5) === cloneNextLessonsArr.length) {
                    cloneNextLessonsArr.push([v]);
                } else {
                    let a = [...cloneNextLessonsArr[Math.floor(i/5)]]
                    cloneNextLessonsArr[Math.floor(i/5)] = [...a ,v]
                }
            })
        }
        setNextLessonsArr(cloneNextLessonsArr);
    }, [dataClassNow])

    const onModalDeleteLessons = useSelector(state => state.onModalDeleteLessonsReducer.onModal);
    
    const handleToggleFixed = async (boolean) => {
        await dispatch(toogleFixedScheduleAction(localStorage.getItem('uid'), localStorage.getItem('classChoosen'), boolean));
        location.reload();
    }

    const loadingToggleFixedSchedule = useSelector(state => state.toggleFixedScheduleReducer.loading)

    const calDate =  (v2) => {
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
        return({date, month, year, timeStart, timeEnd})
    }

    const [resultSchedule, setResultSchedule] = useState();

    const fetchDataError = useSelector(state => state.getUserDataReducer.error);

    useEffect(() => {
        const updateData = async () => {
            if(dataClassNow && resultSchedule) {
                if( resultSchedule.lessonAtNow !== dataClassNow.schedule.lessonAtNow || 
                    (dataClassNow.schedule.nextLessons && resultSchedule.nextLessons && resultSchedule.nextLessons.length !== dataClassNow.schedule.nextLessons.length) || 
                    (resultSchedule.nextLessons === undefined && dataClassNow.schedule.nextLessons) || 
                    (resultSchedule.enRoute !== dataClassNow.schedule.enRoute) || 
                    (!dataClassNow.schedule.nextLessons && dataClassNow.schedule.nextLessons !== resultSchedule.nextLessons)) {
                        await dispatch(updateScheduleNextLessonsFollowTodayAction(localStorage.getItem('uid'), localStorage.getItem('classChoosen'), resultSchedule))
                        await dispatch(getUserData(localStorage.getItem('uid')))
    
                    }
            }
        } 
        updateData();
    }, [resultSchedule])


    useEffect(() => {
        const intervelId = setInterval(async () => {
            if(dataClassNow) {let result = await caculateLessonRealtime(dataClassNow.schedule); 
                if (result) {
                    setResultSchedule(result)
                }}
            }, 500);
        return () => {clearInterval(intervelId);}
    }, [dataClassNow])

    const travelTime = ["00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", "00:35", "00:40", "00:45", "00:50", "00:55", 
    "01:00", "01:05", "01:10", "01:15", "01:20", "01:25", "01:30", "01:35", "01:40", "01:45", "01:50", "01:55", 
    "02:00", "02:05", "02:10", "02:15", "02:20", "02:25", "02:30", "02:35", "02:40", "02:45", "02:50", "02:55", 
    "03:00", "03:05", "03:10", "03:15", "03:20", "03:25", "03:30", "03:35", "03:40", "03:45", "03:50", "03:55", 
    "04:00", "04:05", "04:10", "04:15", "04:20", "04:25", "04:30", "04:35", "04:40", "04:45", "04:50", "04:55", 
    "05:00", "05:05", "05:10", "05:15", "05:20", "05:25", "05:30", "05:35", "05:40", "05:45", "05:50", "05:55", 
    "06:00"]

    const [dataFromChild, setDataFromChild] = useState();

    const handleDataFromChild = (data) => {
        setDataFromChild(data);
    }

    useEffect(() => {
        console.log(dataFromChild);
    }, [dataFromChild])


    return(
        <>
            {loadingToggleFixedSchedule && 
                <ModalTemplate 
                    element={<ModalLoading/>}/>
                }
            {onModalAddHomeworkState && 
                <ModalTemplate2 
                    title={"Add Homework"} 
                    closeFunc={() => {dispatch(onModalAddHomework(false))}} 
                    element={<ModalAddHomework/>}/>
                }
            {onModalUpdateNextLessons && 
            <ModalTemplate2
                title={"Update Next Lessons"}
                closeFunc={() => {dispatch(onModalUpdateNextLessonsAction(false))}}
                element={<ModalUpdateNextLessons />}
            />}
            {onModalDeleteLessons && 
            <ModalTemplate2
                title={"Delete Lessons"}
                closeFunc={() => {dispatch(onModalDeleteLessonsAction(false))}}
                element={<ModalDeleteLessons />}
            />}
            <div className={styles.container}>
                <PickTimesAndDate onDataFromChild={handleDataFromChild} showBtn={true} minDate={new Date().getTime()}/>
            {!fetchDataError ? 
            <>
                <div className={styles.headerPlaceholder}></div>

                {dataClassNow && classNow !== null ? 
                    <>  
                        <div className={styles.classNameBlock}>
                            <div className={styles.label}>Class Name:</div>
                            <div className={styles.className}>{dataClassNow.name}</div>
                        </div>
                        
                        <div className={styles.scheduleContainer}>
                            <div className={styles.blockToggleFixed}>
                                {(dataClassNow && dataClassNow.schedule && dataClassNow.schedule.fixed===true) ? 
                                    <svg onClick={() => {handleToggleFixed(false)}} xmlns="http://www.w3.org/2000/svg" fill="green" className={styles.toggleSwitch} viewBox="0 0 16 16">
                                        <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                    </svg> :
                                    <svg onClick={() => {handleToggleFixed(true)}} xmlns="http://www.w3.org/2000/svg" fill="black" className={styles.toggleSwitch} viewBox="0 0 16 16">
                                        <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                    </svg>
                                }
                                <div className={styles.label}>
                                    Fixed Schedule
                                </div>

                            </div>
                            {dataClassNow.schedule.lessonAtNow && 
                                <>
                                    <div className={styles.itemSchedule}>
                                        {dataClassNow.schedule.enRoute ? 
                                            <div className={styles.containerEnRoute}>
                                                <div className={styles.circleColorYellow}/>
                                                <div>En Route</div>
                                                <img src={enRouteGif}/>
                                            </div> :
                                            <div className={styles.containerEnRoute}>
                                                <div className={styles.circleColorGreen}/>
                                                <div>Learning</div>
                                                <img src={learningGif}/>
                                            </div>
                                        }
                                        <div className={styles.day}>{dataClassNow.schedule.lessonAtNow.dayOfWeek}</div>
                                        <div className={styles.time}>{`${calDate(dataClassNow.schedule.lessonAtNow).timeStart} - ${calDate(dataClassNow.schedule.lessonAtNow).timeEnd}`}</div>
                                        <div className={styles.date}>{`${calDate(dataClassNow.schedule.lessonAtNow).date}/${calDate(dataClassNow.schedule.lessonAtNow).month}/${calDate(dataClassNow.schedule.lessonAtNow).year}`}</div>
                                    </div>
                                </>
                            }

                            {dataClassNow.schedule.fixed && (dataClassNow.schedule.fixedSchedule && dataClassNow.schedule.fixedSchedule !== "") ?
                                <>
                                    <div className={styles.label}>
                                        Schedule
                                    </div>
                                    <div className={`${styles.scheduleBlock} ${dataClassNow.schedule.fixedSchedule.length && styles["numberOfSchedule" + dataClassNow.schedule.fixedSchedule.length]}`}>
                                        {dataClassNow.schedule.fixedSchedule.map((v,i) => {
                                            return(
                                                <div className={styles.itemSchedule}>
                                                    <div className={styles.day}>{v.day}</div>
                                                    <div className={styles.time}>{v.times}</div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </> : 
                                <>
                                    {!dataClassNow.schedule.fixed && 
                                        <>
                                            <div className={styles.blockNote}>
                                                {!editNote ?
                                                    <>
                                                        <div>Note: {dataClassNow.schedule.note}</div>
                                                        <svg onClick={() => {setEditNote(true); setNoteContent(dataClassNow.schedule.note)}} xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                                        </svg> 
                                                    </> : 
                                                    <>
                                                        <div>Note: <textarea value={noteContent} onChange={(e) => {setNoteContent(e.target.value)}}/></div>
                                                        <div className={styles.cancelBtn} onClick={() =>(setEditNote(false))}>Cancel</div>
                                                        <div className={styles.saveBtn} onClick={() => {handleSaveNote()}}>Save</div>
                                                    </>
                                                }
                                            </div>
                                            
                                            <div className={styles.scheduleContainer}>
                                                <div className={styles.label}>
                                                    Schedule
                                                </div>
                                                {dataClassNow.schedule.scheduleArr &&
                                                    <>
                                                        <div className={`${styles.scheduleBlock} ${dataClassNow.schedule.length && styles["numberOfSchedule" + dataClassNow.schedule.length]}`}>
                                                            {dataClassNow.schedule.scheduleArr.map((v,i) => {
                                                                return(
                                                                    <div className={styles.itemSchedule}>
                                                                        <div className={styles.day}>{v.day}</div>
                                                                        <div className={styles.time}>{v.times}</div>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </>
                                                }{nextLessonsArr && 
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
                                                                                    <div className={styles.itemSchedule}>
                                                                                        <div className={styles.day}>{v2.dayOfWeek}</div>
                                                                                        <div className={styles.time}>{`${timeStart} - ${timeEnd}`}</div>
                                                                                        <div className={styles.date}>{`${date}/${month}/${year}`}</div>
                                                                                        <div className={styles.travleTime}>{`Travel Times: ${(v2.travelTime !== 0) ? travelTime[v2.travelTime/1000/60/5] : v2.travelTime}`}</div>
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
                                                <div className={styles.addNextLessons} onClick={() => {handleClickUpdateNextLessons()}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                                    </svg>
                                                    Add next Lessons
                                                </div>
                                                <div className={styles.removeALessons} onClick={() => {dispatch(onModalDeleteLessonsAction(true))}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                                    </svg>
                                                    Remove a Lessons
                                                </div>

                                            </div>
                                        </>
                                    }
                                </>
                            } 
                        </div>
                        <div className={styles.taskContainer}>
                            <div className={styles.title}>Homework for next lesson.</div>
                            <div className={styles.homeworkBlock}>
                            {dataClassNow.homeWork ?
                                <>
                                    { dataClassNow.homeWork.map((v, i) => {
                                        return (
                                            <div className={styles.taskItemBlock}> 
                                                <div className={styles.number}>{i + 1}/</div>
                                                <div className={styles.content}>{v}</div>
                                            </div>
                                        )})
                                    }  
                                </>:
                                <div className={styles.notice}>
                                    <div className={styles.content}>
                                        No homework assigned for the upcoming lesson yet!
                                    </div>
                                </div>}
                                <div className={styles.blockBtn}>
                                    <div className={styles.addHomeWorkBtn} onClick={() => {dispatch(onModalAddHomework(true))}}>Add Homework</div>
                                </div>
                                </div>
                        </div> 
                    </> :
                    <>  
                        {classNow === null && !localStorage.getItem("uid") ?
                            <div className={styles.contentSystem}>Please Login</div> : 
                            <>
                                {localStorage.getItem("uid") && !noClass ?
                                    <div className={styles.contentSystem}>Please wait while the system is fetching data...</div> :
                                    <div className={styles.contentSystem}>Currently, you have no classes! <Link to={'/classes-and-students'}>Click here</Link> to manage classes</div>
                                }
                            </>
                            }
                    </>
                }
            </> 
            : 
            <>
                <div>Check your internet connection and try again later!</div>
            </>}
            </div>
        </>
    )
}

export default Home;