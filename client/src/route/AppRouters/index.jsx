import { useRoutes } from "react-router-dom"
import PATH from "../../config/routeConfig"
import StudentAndClass from "../../page/studentAndClass"
import Manage from "../../page/manage"
import Profile from "../../page/profile"
import Layout1 from "../../component/layout/layout1"
import Home from "../../page/home"
import checkSignin from "../../module/checkSignin"
import SignIn from "../../module/signIn"
import MapInstructions from "../../page/mapInstructions"


const AppRouters = () => {
    checkSignin();
    const element = useRoutes([
        {
            path: PATH.HOME,
            element: <Layout1 />,
            children: [
                {
                    index : true,
                    element : <Home />
                }
            ]
        },
        {
            path: PATH.ALL_CLASSES_AND_STUDENTS,
            element: <Layout1 />,
            children: [
                {
                    index: true,
                    element: <StudentAndClass />
                }
            ]
        },
        {
            path: PATH.MANAGE,
            element: <Manage />,
        },
        {
            path: PATH.PROFILE,
            element: <Layout1 />,
            children: [
                {
                    index: true,
                    element: <Profile />,
                }
            ]
        },
        {
            path: PATH.SIGN_IN,
            element: <Layout1 />,
            children: [
                {
                    index: true,
                    element: <SignIn />,
                }
            ]
        },
        {
            path: PATH.DOC,
            element: <Layout1 />,
            children: [
                {
                    path: PATH.MAP,
                    element: <MapInstructions />,
                }
            ]
        },
    ])
    return element;
}

export default AppRouters;