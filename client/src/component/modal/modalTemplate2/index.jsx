import styles from "./modalTemplate2.module.scss";

const ModalTemplate2 = (Props) => {

    const title = Props.title
    const closeFunc = Props.closeFunc;
    const element = Props.element;

    return(
        <>
            <div className={styles.outside}>
                <div className={styles.containerBox}>
                    <div className={styles.header}>
                        <div className={styles.title}>{title}</div>
                        <svg className={styles.closeBtn} onClick={() => {closeFunc()}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.containerBody}>
                            {element}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ModalTemplate2;