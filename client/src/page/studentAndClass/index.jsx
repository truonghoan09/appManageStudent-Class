import styles from "./student.module.scss";
import {useDispatch, useSelector} from 'react-redux';
import { getUserData, onFirstRegisterClass, onModalConfirmDeletion, setClassnow, updateClassesAfterDeletion } from "../../redux/action";
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
import getAllClassesFrom from "../../module/getAllClassesFrom";
import getStudentsFrom from "../../module/getStudentsFrom";
import ModalConfirmDelete from "../../component/modal/modalTemplateConfirmDelete";


const StudentAndClass = () => {
    const dispatch = useDispatch()
    const isSignin = useSelector(state => state.isSigninReducer.isSignin)
    const [dataClass, setDataClass] = useState([])
    const [deleteOptionClass, setDeleteOptionClass] = useState([]); 
    const [dataStudents, setDataStudents] = useState([])
    useEffect(() => {
        dispatch(getUserData(localStorage.getItem("uid")));
    }, [])

    const dataState = useSelector(state => state.getUserDataReducer.data);


    useEffect(() => {
        if(dataState && dataState.errCode === 0) {
            const fetchData = async () => {
                try {
                  const resultClasses = await getAllClassesFrom(dataState.data);
                  let cloneDeleteOptioneClass;  
                  if(resultClasses) {
                    cloneDeleteOptioneClass = await [...Array(resultClasses.length).fill(false)];  
                    setDeleteOptionClass(cloneDeleteOptioneClass);
                  }
                  setDataClass(resultClasses); // Đây là giá trị của finalData
                  const resultStudents = await getStudentsFrom(dataState.data);
                  setDataStudents(resultStudents); // Đây là giá trị của finalData
                } catch (error) {
                  console.error(error);
                }
            };
            fetchData();
        }
        
    }, [dataState])

    
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

    const ChangeClass = async (id) => {
        await dispatch(setClassnow(id));
        await localStorage.setItem('classChoosen', id);
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

    const handleDeleteClass = async (index) => {
        let cloneDeleteOptioneClass = [...deleteOptionClass];
        cloneDeleteOptioneClass[index] = true;
        await setDeleteOptionClass(cloneDeleteOptioneClass);
        await dispatch(onModalConfirmDeletion(true))
    }
    
    const closeFuncConfirmDeletion = async () => {
        let cloneDeleteOptioneClass = [...deleteOptionClass];
        await cloneDeleteOptioneClass.fill(false);
        await setDeleteOptionClass(cloneDeleteOptioneClass);
        await dispatch(onModalConfirmDeletion(false));

    }

    const onModalConfirmDeletionState = useSelector(state => state.onModalConfirmDeletionReducer.onModal);

    const deleteFunc = async() => {
        let newClassObj = {};
        deleteOptionClass.map((v, i) => {
            if(!v) {
                newClassObj = {...newClassObj, [dataClass[i].data.id]: dataClass[i].data}
            }
        })
        await dispatch(updateClassesAfterDeletion(newClassObj))
        await dispatch(getUserData(localStorage.getItem("uid")));
        await dispatch(onModalConfirmDeletion(false));
    }


    return(
        <>  
            {onRegisterClass && <ModalTemplate element ={<ModalFirstRegisterClass/>}/>}
            {onModalConfirmDeletionState && <ModalConfirmDelete deleteFunc={() => deleteFunc()} closeFunc={() => closeFuncConfirmDeletion()} deleteItem={deleteOptionClass.indexOf(true) !== -1 && dataClass[deleteOptionClass.indexOf(true)].key}/>}
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
                                        {dataClass ? 
                                            <>
                                                <div className={styles.studentBlock}>
                                                    {dataClass && dataClass.map((v, i)=> {
                                                        return(
                                                            <div className={styles.classItem} >
                                                                {v.key}
                                                                <div className={styles.btnBlock}>
                                                                    <div className={styles.viewBtn} onClick={() => ChangeClass(v.data.id)}>View</div>
                                                                    <div className={styles.deleteBtn} onClick={() => {handleDeleteClass(i)}}>Delete</div>
                                                                </div>
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
                                            {dataStudents ? 
                                                <>
                                                    <div className={styles.studentBlock}>
                                                        {dataStudents && dataStudents.map((v, i)=> {
                                                            return(
                                                                <div className={styles.classItem} >
                                                                    {v.key}
                                                                    <div className={styles.btnBlock}>
                                                                        <div className={styles.viewBtn} onClick={() => ChangeClass(key)}>View</div>
                                                                        <div className={styles.deleteBtn}>Delete</div>
                                                                    </div>
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
                                            {dataClass.myEnrolledClasses ? 
                                                <>
                                                    <div className={styles.studentBlock}>
                                                        {dataClass.myEnrolledClasses && Object.keys(dataClass.myEnrolledClasses).map((key)=> {
                                                            return(
                                                                <div className={styles.classItem}>
                                                                    {key}
                                                                    <div className={styles.btnBlock}>
                                                                        <div className={styles.viewBtn}>View</div>
                                                                        <div className={styles.deleteBtn}>Delete</div>
                                                                    </div>
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