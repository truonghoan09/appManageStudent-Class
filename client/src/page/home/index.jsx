import { useEffect, useState } from 'react';
import styles from './home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, onModalAddHomework, onModalDeleteLessonsAction, onModalUpdateNextLessonsAction, setClassnow, updateNoteScheduleAction, updateScheduleNextLessonsFollowTodayAction } from '../../redux/action';
import getFristClass from '../../module/getFirstClass';
import getClassFollowClassNow from '../../module/getClassFollowClassNow';
import ModalAddHomework from '../../component/modal/modalAddHomework';
import ModalTemplate2 from '../../component/modal/modalTemplate2';
import ModalUpdateNextLessons from '../../component/modal/modalUpdateNextLessons';
import ModalDeleteLessons from '../../component/modal/modalDeleteLessons';


const Home = () => {
    const [dataClassNow, setDataClassNow] = useState()
    const dispatch = useDispatch();

    useEffect(() => {

        const intervalId = setInterval( async () => {
            if(localStorage.getItem('uid') && localStorage.getItem('classChoosen')) {
                await dispatch(updateScheduleNextLessonsFollowTodayAction(localStorage.getItem("uid"), localStorage.getItem("classChoosen")))
                await dispatch(getUserData(localStorage.getItem('uid')))
            }
        }, 10000)
        return () => clearInterval(intervalId);
    }, [dispatch])

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
    const dataState = useSelector(state => state.getUserDataReducer.data);


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


    const [serverFail, setServerFail] = useState(false);

    const [noteContent, setNoteContent] = useState('');
    const [editNote, setEditNote] = useState(false);

    useEffect(() => {
        if(classNow !== null) {
            setTimeout(() => {
                setServerFail(true);
            }, 5000);
        } else { 
            setServerFail(false)
        }
    }, [classNow])

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
        if(dataClassNow && dataClassNow.schedule.nextLessons.length > 0) {
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
    
    

    return(
        <>
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
                closeFunc={() => {dispatch(onModalUpdateNextLessonsAction(false))}}
                element={<ModalDeleteLessons />}
            />}
            <div className={styles.container}>
                <div className={styles.headerPlaceholder}></div>
                
                {dataClassNow && classNow !== null ? 
                    <>  
                        <div className={styles.classNameBlock}>
                            <div className={styles.label}>Class Name:</div>
                            <div className={styles.className}>{dataClassNow.name}</div>
                        </div>
                        
                        <div className={styles.scheduleContainer}>
                             {!dataClassNow.schedule.note && dataClassNow.schedule !== "" ?
                                <>
                                    <div className={styles.label}>
                                        Schedule
                                    </div>
                                    <div className={`${styles.scheduleBlock} ${dataClassNow.schedule.length && styles["numberOfSchedule" + dataClassNow.schedule.length]}`}>
                                        {dataClassNow.schedule.map((v,i) => {
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
                                    {dataClassNow.schedule.note && 
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
                                                                                let date = (new Date(v2.date)).getDate(); 
                                                                                let month = (new Date(v2.date)).getMonth() + 1; 
                                                                                let year = (new Date(v2.date)).getFullYear(); 
                                                                                date = date < 10 ? '0' + date : date;
                                                                                month = month < 10 ? '0' + month : month;
                                                                                return(
                                                                                    <div className={styles.itemSchedule}>
                                                                                        <div className={styles.day}>{v2.dayOfWeek}</div>
                                                                                        <div className={styles.time}>{`${hours}:${minutes}`}</div>
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
                            <div>Please Login</div> : 
                            <>
                                {localStorage.getItem("uid") && !serverFail ?
                                    <div>Please wait while the system is fetching data...</div> :
                                    <>
                                        {
                                            serverFail && <div>Server Error!</div>
                                        }
                                    </>
                                }
                            </>
                            }
                    </>
                }
            </div>
        </>
    )
}

export default Home;