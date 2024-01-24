import { Link } from "react-router-dom";
import styles from "./manage.module.scss";

const Manage = () => {
    const handleClickExit = () => {
        window.location.pathname = "/";
    }

    const handleClickSave = () => {
        alert('Clicked Save');
    }
    return(
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.saveBtn} onClick={() => handleClickSave()}>Save</div>
                    <div className={styles.exitBtn} onClick={() => handleClickExit()}>Exit</div>
                </div>
                <div className={styles.headerPlaceholder}></div>
                This is container manage
            </div>
        </>
    )
}

export default Manage;