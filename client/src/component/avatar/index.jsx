import { useEffect, useRef, useState } from "react";
import styles from './avatar.module.scss'
import getProfile from "../../module/getProfile";
import {getCookie, setCookie} from "../../module/cookieTask";
import { useSelector } from "react-redux";



const Avatar = (props) => {

    const [avtUrl, setAvtUrl] = useState(props.uid === localStorage.getItem('uid') ? getCookie('photoUrl') : "");

    getProfile(props.uid).then((result) => {
        setCookie("photoUrl", result.photoUrl)
        setAvtUrl(result.photoUrl)
    }).catch((err) => {
        console.log(err);
    });


    const useOutsideTask = (ref) => {
        useEffect(() => {
         
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowAvaMenu(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    const [showAvaMenu, setShowAvaMenu] = useState(false);
    const handleClickAvatar = () => {
        setShowAvaMenu(!showAvaMenu);
    }

    const wrapperRef = useRef(null);
    useOutsideTask(wrapperRef);

    const handleClickProfile = async () => {
        window.location.pathname = `/profile/${props.uid}`;
        setShowAvaMenu(false);
    }   

    const handleClickLogout = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('uid');
        await localStorage.removeItem('classChoosen');
        await localStorage.removeItem('listProfile')
        await localStorage.removeItem('firebase:host:managestudent-class-default-rtdb.firebaseio.com');
        setShowAvaMenu(false);
        location.reload();
    }   

    const isSignin = useSelector(state => state.isSigninReducer.isSignin);

    const handleClickSignin = (pathname) => {
        if(pathname.split('/').pop() === "") {localStorage.setItem('backTo', "/")} else {
            localStorage.setItem('backTo', `${pathname}`)
        }
        window.location.pathname = '/signin'
    }

    return(
        <>
            {avtUrl ? <img ref={wrapperRef} onClick={() => {handleClickAvatar()}} className={styles.avt} src={avtUrl}/> : 
                <svg onClick={() => {handleClickAvatar()}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.avt} viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>}
                <div ref={wrapperRef} className={showAvaMenu ? styles.menuOn : styles.menuOff}>
                    {!isSignin ? <div onClick={() => {handleClickSignin(window.location.pathname)}} className={styles.menuItem}>Sign In</div> : 
                        <>
                            <div onClick={() => handleClickProfile()} className={styles.menuItem}>Profile</div>
                            <div onClick={() => {window.location.pathname = "/classes-and-students"}} className={styles.menuItem}>All Classes and Students</div>
                            <div onClick={() => handleClickLogout()} className={styles.menuItem}>Log out</div>
                        </>
                    }
                </div>
        </>
    )
}

export default Avatar;