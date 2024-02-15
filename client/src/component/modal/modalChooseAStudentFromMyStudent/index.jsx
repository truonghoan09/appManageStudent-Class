import { useDispatch, useSelector } from "react-redux"
import styles from "./modalChooseAStudentFromMyStudents.module.scss"
import { getAllStudentsName, onModalChooseAStudentInMyStudents, setStudentFromMyStudent } from "../../../redux/action";
import { useEffect, useState } from "react";
import BlockStudentInfoPreview from "../../blockStudentInfoPreview";

const ModalChooseAStudentFromMyStudents = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStudentsName());
    }, [])
    const loading = useSelector(state => state.getAllStudentsNameReducer.loading);
    const error = useSelector(state => state.getAllStudentsNameReducer.error);
    const studentArr = useSelector(state => state.getAllStudentsNameReducer.data.data);

    const indexToChoose = useSelector(state => state.onModalChooseAStudentInMyStudentReducer.indexToChoose);

    const [showStudent, setShowStudent] = useState([...Array(studentArr.length).fill(false)]);
    const [chooseStudent, setChooseStudent] = useState([...Array(studentArr.length).fill(false)]);


    const handleSetShowStudent = (index, boolean) => {
        let cloneShowSTudent = [...showStudent];
        cloneShowSTudent[index] = boolean;
        setShowStudent(cloneShowSTudent);
    }

    const handleSetChoose = (index, boolean) => {
        let cloneChooseStudent = [...Array(studentArr.length).fill(false)];
        if(boolean === true) {
            cloneChooseStudent[index] = true;
        }  
        setChooseStudent(cloneChooseStudent);
    }

    const handleClickConfirm = () => {
        let indexResult = -1
        chooseStudent.map((v,i) => {
            if(v) {indexResult=i};
        })
        if(canConfirm) {
            dispatch(setStudentFromMyStudent(indexToChoose, studentArr[indexResult]))
            dispatch(onModalChooseAStudentInMyStudents(false, -1));
        }
    }

    const handleClickCancel = () => {
        dispatch(onModalChooseAStudentInMyStudents(false, -1))
    }

    const [canConfirm, setCanConfirm] = useState(false);

    useEffect(() => {
        let indexResult = -1
        chooseStudent.map((v,i) => {
            if(v) {indexResult=i};
        })
        if(indexResult === -1) {
            setCanConfirm(false);
        } else {
            setCanConfirm(true);
        }
    }, [chooseStudent])

    return(
        <>
            <div className={styles.containerBox}>
                <div className={styles.header}>
                    <div className={styles.title}>My Student</div>
                    <svg className={styles.closeBtn} onClick={() => {dispatch(onModalChooseAStudentInMyStudents(false))}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>
                <div className={styles.body}>
                {studentArr.map((v,i) => {
                            return(
                                <div onClick={() => handleSetChoose(i, !chooseStudent[i])} className={`${styles.containerBlock} ${chooseStudent[i] && styles.chooseStudent}`}>
                                    <div className={styles.interactionBlock}>
                                        {!showStudent[i] ?
                                            <svg onClick={() => {handleSetShowStudent(i, true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-arrow-bar-down ${styles.arrowBtn}`} viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5M8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6"/>
                                            </svg> :
                                            <svg onClick={() => {handleSetShowStudent(i, false)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-arrow-bar-up ${styles.arrowBtn}`} viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
                                            </svg>
                                        }
                                        {chooseStudent[i] ? 
                                            <svg onClick={() => handleSetChoose(i, false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className={`bi bi-check-circle ${styles.tickCirle}`} viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                            </svg>
                                        :
                                            <svg onClick={() => handleSetChoose(i, true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className={`bi bi-circle ${styles.tickCirle}`} viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            </svg>
                                        }
                                    </div>
                                    <BlockStudentInfoPreview data={v.value} maximize={showStudent[i]} offLink={true} />
                                </div>
                            )
                        })}
                        <div className={styles.blockBtnFinal}>
                            <div onClick={() => {handleClickCancel()}} className={styles.cancelBtn}>
                                Cancel
                            </div>
                            <div onClick={() => {handleClickConfirm()}} className={`${styles.saveBtn} ${!canConfirm && styles.canNotConfirm}`}>
                                Confirm
                            </div>
                        </div>
                </div>

            </div>
        </>
    )
}

export default ModalChooseAStudentFromMyStudents;