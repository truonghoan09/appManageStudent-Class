import { useDispatch } from "react-redux"
import { isSignin } from "../redux/action"

const checkSignin = () => {
    const dispatch = useDispatch()
    if(localStorage.getItem('token')) {
        dispatch(isSignin(true))
    } else {dispatch(isSignin(false))}
    return
}

export default checkSignin