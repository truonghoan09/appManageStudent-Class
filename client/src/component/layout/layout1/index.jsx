import { Outlet } from "react-router-dom"
import Header from "../../header"
import styles from "../layout.module.scss"


const Layout1 = () => {
    return(
        <div>
            <Header />
            <div className={styles.containerOutlet}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout1