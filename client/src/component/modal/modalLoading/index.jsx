import styles from "./modalLoading.module.scss";
import { IMAGE } from "../../../config/routeConfig";
const ModalLoading = () => {
    return(
        <div className={styles.containerElement}>  
            <img src={IMAGE.loadingGif}/>
        </div>
    )
}
export default ModalLoading;