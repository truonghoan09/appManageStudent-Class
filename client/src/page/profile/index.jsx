import { useState } from 'react'
import getProfile from '../../module/getProfile'
import styles from './profile.module.scss'
import { useEffect } from 'react';
import { ref, set, update } from 'firebase/database';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [canEditProfile, setCanEditProfile] = useState(false);
    const uid = window.location.pathname.split('/').pop();
    useEffect(() => {
        if (localStorage.getItem('uid') && uid === localStorage.getItem('uid')){setCanEditProfile(true)}
    }, [])
    const [profileData, setProfileData] = useState(localStorage.getItem('listProfile') ? JSON.parse(localStorage.getItem('listProfile')) : {})

    getProfile(uid).then((result) => {
        localStorage.setItem('listProfile', JSON.stringify(result));
        setProfileData(result);
    }).catch((err) => {
        console.log(err);
    });

    const [editMode, setEditMode] = useState(false);
    
    const [createInput, setCreateInput] = useState([]);
    
    const handleClickSaveProfile = async () => {
        const PreListProfile = await JSON.parse(localStorage.getItem('listProfile'));

        const newList = [];
        await createInput.map((v, i) => {
            // if(PreListProfile.listProfile.list.indexOf(v.field) === -1) {
            //     PreListProfile.listProfile.list.push(v.field)
            // }
            if(createInput[i].information === "") {
                createInput.splice(i, 1);
            } else {
                newList.push(v.field);
                if(v.field === "map" && v.information.indexOf(' ') !== -1) {
                    let aLink = v.information.split(" ")
                    let indexLink = aLink.findIndex((v) => {
                        return(v.indexOf('src="') !== -1) 
                    })
                    if(indexLink !== -1) {
                        let link = aLink[indexLink].replace('src="', '').slice(0, -1);
                        PreListProfile.listProfile[v.field] = link;
                        
                    }
                } else {
                    PreListProfile.listProfile[v.field] = v.information;
                }
            }
        })
        Object.keys(PreListProfile.listProfile).map((key) => {
            if (!newList.includes(key)) {
                console.log('delete '," ",key, " ",newList.includes(key));
                delete PreListProfile.listProfile[key]
            }
        })

        PreListProfile.listProfile.list = newList;
        await setEditMode(false);
        console.log('Prelis Profile',PreListProfile);
        const myProfileRef = ref(db, "users/" + localStorage.getItem('uid') + "/")
        await update(myProfileRef, {
            myProfile: PreListProfile
        })
        setCreateInput([]);
    }

    const handleClickAddProfile  = () => {
        setCreateInput([...createInput, {
            field: "",
            information: "",
        }])
    }

    const handleClickDeleteInput = (i) => {
        createInput.splice(i, 1);
        console.log('delete ', i)
        console.log(createInput);
    } 

    const handleChangeField = (i, e) => {
        setCreateInput(() => {
            const newArr = [...createInput];
            newArr[i].field = e.target.value
            return newArr;
        })
    }

    const handleChangeInformation = (i, e) => {
        setCreateInput(() => {
            const newArr = [...createInput];
            newArr[i].information = e.target.value
            return newArr;
        })
    }

    const handleOnEditMode = () => {
        setEditMode(true);
        const preListProfile = JSON.parse(localStorage.getItem('listProfile')).listProfile
        let newArr = [];
        preListProfile.list.map((v) => {
            // console.log(v)
            newArr.push({
                field:  v,
                information : preListProfile[v]
            })
        })
        setCreateInput(newArr)
    }

    return(
        <>
            
            <div className={styles.containerPage}>
                <div className={styles.left}>
                    <img className={styles.avatar} src={profileData.photoUrl}/>
                    {canEditProfile && 
                        <div onClick={() => {handleOnEditMode()}} className={styles.editBtn}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                      </svg> Edit</div>}
                </div>

                <div className={styles.inforBlock}>
                    {profileData.listProfile && profileData.listProfile.list.map((v,i) => {
                        return(
                            <>  
                                {!editMode && 
                                    <>
                                        { (v !== "map") ?
                                            <div key={i} className={styles.item}>{profileData.listProfile[v]}</div> :
                                            <iframe className={styles.mapBox} src={profileData.listProfile[v]} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                        }
                                    </>
                                }
                            </>
                        )
                    })}
                    {editMode && 
                        <>  
                            <div className={styles.mapInstructionsLabel}>We support directly integrating maps into personal information. <Link to={"/doc/map"}>Click here</Link> to view instructions!</div>
                            {createInput.length > 0 && createInput.map((v,i) => {
                                return(
                                    <div key={i} className={styles.blockInput}>
                                        <div className={styles.containerInput}>
                                            <div className={styles.lable}>
                                                <div>Field</div>
                                                <input onChange={(e) => {handleChangeField(i,e)}} value={createInput[i].field}/>
                                            </div>
                                            <div className={styles.inputArea}>
                                                <div>Your information</div>
                                                <input onChange={(e) => {handleChangeInformation(i, e)}} value={createInput[i].information}/>
                                            </div>
                                        </div>
                                        <div className={styles.deleteInputBtn}>
                                        <svg onClick={() => {handleClickDeleteInput(i)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={styles.addProfile} onClick={() => {handleClickAddProfile()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                            </div>
                            <div onClick={() => handleClickSaveProfile()} className={styles.saveBtn}>Save</div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Profile