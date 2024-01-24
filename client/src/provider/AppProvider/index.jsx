import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import {Provider} from "react-redux";
import store from "../../redux/store";

const AppProvider = ({children}) => {
    return(
        <Provider store =  {store}>
            <Suspense fallback={<h1>Loading...</h1>}>
                <BrowserRouter>{children}</BrowserRouter>
            </Suspense>
        </Provider>

    )
}

export default AppProvider