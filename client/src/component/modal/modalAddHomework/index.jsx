import { useEffect, useRef, useState } from "react";
import styles from "./modalAddHomework.module.scss";
import { onModalAddHomework, saveAHomeWorkAction } from "../../../redux/action";
import { useDispatch } from "react-redux";

const ModalAddHomework = () => {

    const [homework, setHomework] = useState("");

    const dispatch = useDispatch();

    const closeFunc = () => {
        dispatch(onModalAddHomework(false));
    }

    const [redNotice, setRednotice] = useState(false)

    const saveFunc = () => {
        if(!homework) {
            setRednotice(true);
        } else {
            const saveHomework = async () => {
                await dispatch(saveAHomeWorkAction(localStorage.getItem("uid"), localStorage.getItem("classChoosen"), homework))
                location.reload();
                await dispatch(onModalAddHomework(false));
            }
            saveHomework();
        }
    }


    return(
        <>  
            <div className={styles.containerElement}>
                
                <div className={styles.blockInput}>
                    <div className={styles.blockLable}>
                        <div>Exercise: </div>
                    </div>
                    <input onFocus={() => {setRednotice(false)}} className={redNotice ? styles.redNotice : ""} placeholder="Enter a Exercise" onChange={(e) => {setHomework(e.target.value)}}/>
                </div>

                <div className={styles.footer}>
                    <div className={styles.exitBtn} onClick={() => {closeFunc()}}>Cancel</div>
                    <div className={styles.saveBtn} onClick={() => {saveFunc()}}>Save</div>
                </div>
            </div>
        </>
    )
}

export default ModalAddHomework;