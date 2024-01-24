import styles from "./modalTemplate.module.scss";

const ModalTemplate = (props) => {
    return(
        <>
            <div className={styles.outside}>
                {props.element}
            </div>
        </>
    )
}

export default ModalTemplate;