import styles from "./student.module.scss";
import {useDispatch, useSelector} from 'react-redux';
import { onFirstRegisterClass, setClassnow } from "../../redux/action";
import GoogleButton from 'react-google-button'
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider, db } from "../../firebase";
import {ref, set, get, child, update} from "firebase/database"
import checkSignin from "../../module/checkSignin";
import { useEffect, useState } from "react";
// import Avatar from "../../component/avatar";
import { getCookie, setCookie } from "../../module/cookieTask";
import ModalTemplate from "../../component/modal/modalTemplate";
import ModalEnterFee from "../../component/modal/modalFirstRegisterClass";
import ModalFirstRegisterClass from "../../component/modal/modalFirstRegisterClass";


const StudentAndClass = () => {
    const isSignin = useSelector(state => state.isSigninReducer.isSignin)
    const [data, setData] = useState('');
    useEffect(() => {
        get(child(ref(db), `users/` +  localStorage.getItem('uid'))).then((result) => {
            setData(result.val());
        }).catch((err) => {
            console.log(err)
        });
    }, [])

    const dispatch = useDispatch()
    
    const  goHome = ()  => {
        window.location.pathname = "/";
    }

    useEffect(() => { 

        if(isSignin === true) {
            const uid = localStorage.getItem('uid');
            const dbRef = ref(db, 'users')
            get(child(dbRef, `${uid}/myStudents`)).then((snapshot) => {
                if (snapshot.exists()) {
                } else {
                }
            })
        }
    }, [isSignin])

    const ChangeStudent = async (key) => {
        await dispatch(setClassnow(key));
        await localStorage.setItem('classChoosen', key);
        await goHome();
    }

    const arrSubHeader = ['My Classes', 'My Students', 'My Enrolled Classes']
    const [subHeadChoosen, setSubHeadChoosen] = useState(0);

    const handleClickSubHeader = (i) => {
        setSubHeadChoosen(i);
    }

    const [showMenuSubHeaderShort, setShowMenuSubHeaderShort] = useState(false);

    const handleClickSubHeadershort = () => {
        setShowMenuSubHeaderShort(!showMenuSubHeaderShort);
    }

    const a = {   
        fee: "200",
        scheldule: [{day: "Monday", time: "7pm", out : "8pm"}, {day: "Thursday", time: "7pm", out:  "8pm"}],
        location: "Lưu vào đây 1 cái map",
        rollCall: ["day", "day", "day"], /* (Này là mảng lưu lại các ngày có lớp diễn ra từ thời điểm bấm bắt đầu đến thời điểm bấm kết sổ)*/
        students: ["Danh sách các học sinh trong lớp này", "hs2"],
        dayOff: [[], ["day"]], /*Mảng của các mảng điểm danh ngày off của học viên]} (này sẽ có dữ liệu nếu đây là lớp nhóm */
        homeWork: ["task 1", "task 2"],
        historyRollCall: [[], [], [], [], [], [], [], [], [], []] /*[mảng gồm 10 phần tử] => Các phần tử là các mảng roll day cũ, lưu tối đa 10 lần */
    }

    const initClassObj = {
        name: "",
        fee : "",
        schedule: [],
        location: "",
        map: "",
        rollCall: [],
        students: [],
        dayOff: [],
        homeWork: [],
        historyRollCall: [],
    }

    const onRegisterClass = useSelector(state => state.onFirstRegisterClassModalReducer.onModal);

    const handleClickAddClass = async() => {
        get(child(ref(db), "users/" + localStorage.getItem('uid') + "/myClasses")).then((snapshot) => {
            if(snapshot.val() === "") {

            }
        }).catch((err) => {
            console.log(err);
        })
        await dispatch(onFirstRegisterClass(true));
    }

    return(
        <>  
            {onRegisterClass && <ModalTemplate element ={<ModalFirstRegisterClass/>}/>}
            <div className={styles.container}>
                {isSignin &&
                    <>
                        <div className={styles.containerBlock}>
                            <div className={styles.subHeader}>
                                {arrSubHeader.map((v, i) => {
                                    return(
                                        <div key={i} className={`${styles.subHeaderItem} ${(subHeadChoosen === i) && styles.choosen}`} onClick={() => handleClickSubHeader(i)}>{v}</div>
                                    )
                                })}
                            </div>
                            <div className={styles.subHeaderShort} onClick={()=> handleClickSubHeadershort()}>
                                <div className={styles.choosen}>
                                    {arrSubHeader[subHeadChoosen]}
                                </div>
                                {
                                    !showMenuSubHeaderShort ?
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.arrow} viewBox="0 0 16 16">
                                        <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
                                    </svg> : 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.arrow} viewBox="0 0 16 16">
                                        <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
                                    </svg>
                                }
                                <div className={`${styles.menuSubHeaderShortBox} ${showMenuSubHeaderShort ? styles.active : styles.inActive}`}>
                                    {arrSubHeader.map((v,i) => {
                                        if(i !== subHeadChoosen) {
                                            return(
                                                <div key={i} className={styles.subHeaderShortItem} onClick={() => {handleClickSubHeader(i)}}>{v}</div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                            <div className={styles.outletBlock}>
                                {subHeadChoosen === 0 ?
                                    <>
                                        {data.myClasses ? 
                                            <>
                                                <div className={styles.studentBlock}>
                                                    {data.myClasses && Object.keys(data.myClasses).map((key)=> {
                                                        return(
                                                            <div className={styles.classItem} onClick={() => ChangeStudent(key)}>
                                                                {key}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </> 
                                            :
                                            <>
                                                <div className={styles.notice}>Currently, you have no classes!</div>
                                            </> 
                                        }
                                        <div className={styles.addClass} onClick={() => {handleClickAddClass()}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                            </svg>
                                        </div>
                                    </>
                                :
                                <>
                                    {
                                        subHeadChoosen === 1 ?
                                        <>
                                            {data.myStudents ? 
                                                <>
                                                    <div className={styles.studentBlock}>
                                                        {data.myStudents && Object.keys(data.myStudents).map((key)=> {
                                                            return(
                                                                <div className={styles.classItem} onClick={() => ChangeStudent(key)}>
                                                                    {key}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </> 
                                                :
                                                <>
                                                    <div className={styles.notice}>Currently, you have no students!</div>
                                                </> 
                                            }
                                        </> : 
                                        <>
                                            {data.myEnrolledClasses ? 
                                                <>
                                                    <div className={styles.studentBlock}>
                                                        {data.myEnrolledClasses && Object.keys(data.myEnrolledClasses).map((key)=> {
                                                            return(
                                                                <div className={styles.classItem} onClick={() => ChangeStudent(key)}>
                                                                    {key}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </> 
                                                :
                                                <>
                                                    <div className={styles.notice}>Currently, you are not participating in any class!</div>
                                                </> 
                                            }
                                        </>
                                    }
                                </>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default StudentAndClass;