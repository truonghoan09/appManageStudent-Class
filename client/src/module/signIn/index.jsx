import GoogleButton from 'react-google-button';
import styles from './signIn.module.scss';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider, db } from "../../firebase";
import {ref, get, child, update} from "firebase/database"
import { useDispatch } from 'react-redux';
import { setData } from '../../redux/action';


const SignIn = () => {

    const dispatch = useDispatch();
    
    const handleClickGoogleButton = async () => {

    
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);

        localStorage.setItem('token', result.user.accessToken);
        localStorage.setItem('uid', result.user.uid);
        const dbRef = ref(db, 'users');
        const snapshot = await get(child(dbRef, result.user.uid));
        if (snapshot.exists()) {
            dispatch(setData(JSON.stringify(snapshot.val())))
            const userRef = ref(db, 'users/' + result.user.uid);
            await get(child(ref(db), "users/" + result.user.uid + "/myProfile/listProfile")).then(
                (snapshot) => {
                    localStorage.setItem('listProfile', JSON.stringify(snapshot.val()))
                }).catch((err) => {
                    console.log(err);
                })
            await update(userRef,
                {myProfile : result.user.reloadUserInfo}
            ).catch((error) => {
                console.log(error)
            })
            const myProfileRef = ref(db, "users/" + result.user.uid + "/myProfile/")
                await update(myProfileRef,
                    {
                        listProfile: JSON.parse(localStorage.getItem('listProfile'))
                    }
                ).catch((error) => {
                    console.log(error)
                })
        } else {
                await update(dbRef, 
                    {
                        [result.user.uid] : {
                            myStudents: "",
                            myClasses: "",
                            myEnrolledClasses: "",
                            invitation: "",
                            myProfile: result.user.reloadUserInfo,
                        }
                    }
                ).catch((error) => {
                    console.log(error)
                })
            try {
                const myProfileRef = ref(db, "users/" + result.user.uid + "/myProfile")
                await update(myProfileRef,
                    {
                        listProfile: {
                            list : ['displayName', 'email'],
                            displayName : result.user.reloadUserInfo.displayName,
                            email : result.user.reloadUserInfo.email,
                        }
                    }
                ).catch((error) => {
                    console.log(error)
                })
            } catch (error) {
                console.log(error)
            }
                
            }
        window.location.pathname = localStorage.getItem('backTo');
        } catch (error) {
        console.log(error);
        }
    }

    return(
        <div className={styles.container}>
            <div>Please log in to access our services.</div>
            <div className={styles.containerLogin}>
                <GoogleButton onClick={() => {handleClickGoogleButton()}}/>
            </div>
        </div>
    )
}

export default SignIn;