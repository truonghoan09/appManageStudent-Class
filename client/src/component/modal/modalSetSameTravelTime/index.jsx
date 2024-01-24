import { useDispatch } from "react-redux";
import styles from "./ModalSetSameTravelTime.module.scss";
import { onModalSameTravelTimeAction, reRenderSameTravelTimeAction, sharedTravelTimeAction } from "../../../redux/action";
import { useState } from "react";

const ModalSetSameTravelTime = () => {
    const dispatch = useDispatch();

    const travelTime = ["00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", "00:35", "00:40", "00:45", "00:50", "00:55", 
    "01:00", "01:05", "01:10", "01:15", "01:20", "01:25", "01:30", "01:35", "01:40", "01:45", "01:50", "01:55", 
    "02:00", "02:05", "02:10", "02:15", "02:20", "02:25", "02:30", "02:35", "02:40", "02:45", "02:50", "02:55", 
    "03:00", "03:05", "03:10", "03:15", "03:20", "03:25", "03:30", "03:35", "03:40", "03:45", "03:50", "03:55", 
    "04:00", "04:05", "04:10", "04:15", "04:20", "04:25", "04:30", "04:35", "04:40", "04:45", "04:50", "04:55", 
    "05:00", "05:05", "05:10", "05:15", "05:20", "05:25", "05:30", "05:35", "05:40", "05:45", "05:50", "05:55", 
    "06:00"]

    const [commonTime, setCommonTime] = useState('00:00');

    const handleChangeCommonTravelTime = (index) => {
        setCommonTime(travelTime[index]);
    }

    const handleSave = () => {
        dispatch(sharedTravelTimeAction(commonTime));
        dispatch(reRenderSameTravelTimeAction(true));
        dispatch(onModalSameTravelTimeAction(false))
    }

    return(
        <>
            <div className={styles.containerBox}>
                <div className={styles.header}>
                    <div className={styles.title}>Setup A Same Travel Time</div>
                    <svg className={styles.closeBtn} onClick={() => {dispatch(onModalSameTravelTimeAction(false))}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>
                <div className={styles.body}>
                    <div className={styles.blockNotice}>
                        Note: If you save a value for 'Common Travel Time,' all your 'Travel Time' fields will be updated similarly!
                    </div>
                    <div className={styles.containerForm}>
                        <div>Select a common travel time for all classes.</div>
                        <select onChange={(e) => handleChangeCommonTravelTime(e.target.selectedIndex)}>
                            {travelTime.map((v, i) => {
                                return(
                                    <option key={i} value={i}>{v}</option>
                                )
                            })}
                        </select>
                        <div className={styles.blockBtn}>
                            <div className={styles.exitBtn} onClick={() => {dispatch(onModalSameTravelTimeAction(false))}}>Cancel</div>
                            <div className={styles.saveBtn} onClick={() => {handleSave()}}>Save</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ModalSetSameTravelTime;