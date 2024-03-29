import { useDispatch, useSelector } from 'react-redux';
import styles from './modalFirstRegister.module.scss'
import { addClassAction, addStudentsAction, onFirstRegisterClass, onModalChooseAStudentInMyStudents, onModalNoticeAction, onModalSameTravelTimeAction, reRenderSameTravelTimeAction, setStudentFromMyStudent, sharedTravelTimeAction } from '../../../redux/action';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalTemplate from '../modalTemplate';
import ModalSetSameTravelTime from '../modalSetSameTravelTime';
import BlockStudentInfoPreview from '../../blockStudentInfoPreview';
import ModalChooseAStudentFromMyStudents from '../modalChooseAStudentFromMyStudent';
import ModalTemplateNotice from '../modalTemplateNotice';

const ModalFirstRegisterClass = () => {
    const dispatch = useDispatch();


    const nameRef = useRef(null)
    const locationRef = useRef(null)
    const linkOnlineRef = useRef(null)

    const [notice, setNotice] = useState("");

    const [onlineClass, setOnlineClass] = useState(false)


    const initDaysChoosenItem = {day: "Monday", times: "00:00", duration: 1, travelTime: "00:00"}


    const [daysChoosen, setDaysChoosen] = useState([{day: "Monday", times: "00:00", duration: 1, travelTime: "00:00"}]);


    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const timesInDay = [
        "00:00", "00:15", "00:30", "00:45",
        "01:00", "01:15", "01:30", "01:45",
        "02:00", "02:15", "02:30", "02:45",
        "03:00", "03:15", "03:30", "03:45",
        "04:00", "04:15", "04:30", "04:45",
        "05:00", "05:15", "05:30", "05:45",
        "06:00", "06:15", "06:30", "06:45",
        "07:00", "07:15", "07:30", "07:45",
        "08:00", "08:15", "08:30", "08:45",
        "09:00", "09:15", "09:30", "09:45",
        "10:00", "10:15", "10:30", "10:45",
        "11:00", "11:15", "11:30", "11:45",
        "12:00", "12:15", "12:30", "12:45",
        "13:00", "13:15", "13:30", "13:45",
        "14:00", "14:15", "14:30", "14:45",
        "15:00", "15:15", "15:30", "15:45",
        "16:00", "16:15", "16:30", "16:45",
        "17:00", "17:15", "17:30", "17:45",
        "18:00", "18:15", "18:30", "18:45",
        "19:00", "19:15", "19:30", "19:45",
        "20:00", "20:15", "20:30", "20:45",
        "21:00", "21:15", "21:30", "21:45",
        "22:00", "22:15", "22:30", "22:45",
        "23:00", "23:15", "23:30", "23:45"
      ];

    const travelTime = ["00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", "00:35", "00:40", "00:45", "00:50", "00:55", 
    "01:00", "01:05", "01:10", "01:15", "01:20", "01:25", "01:30", "01:35", "01:40", "01:45", "01:50", "01:55", 
    "02:00", "02:05", "02:10", "02:15", "02:20", "02:25", "02:30", "02:35", "02:40", "02:45", "02:50", "02:55", 
    "03:00", "03:05", "03:10", "03:15", "03:20", "03:25", "03:30", "03:35", "03:40", "03:45", "03:50", "03:55", 
    "04:00", "04:05", "04:10", "04:15", "04:20", "04:25", "04:30", "04:35", "04:40", "04:45", "04:50", "04:55", 
    "05:00", "05:05", "05:10", "05:15", "05:20", "05:25", "05:30", "05:35", "05:40", "05:45", "05:50", "05:55", 
    "06:00"]
   
    
    const createAnIDStudent = () => {
        return(
            String(Date.now())
        )
    }

    const durationTimes = [1, 1.5, 2, 2.5, 3, 3.5, 5.5, 6, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

    const [useSharedTravelTime, setUseSharedTravelTime] = useState([false])
    
    const firstId = createAnIDStudent();

    let initStudentInfor = {id: firstId, name: "", age: "", email: "", sex: "---", phone: "", address: "", parents: {name: "", age: "", email: "", sex: "---", phone: "", address: ""}}



    const [newClass, setNewClass] = useState({
        id: "",
        name: "",
        fee : "",
        schedule: {fixed: true, enRoute: false, fixedSchedule: [initDaysChoosenItem], note: "", nextLessons: ""},
        location: "",
        map: "",
        linkOnline: "",
        rollCall: "",
        students: [firstId],
        dayOff: "",
        homeWork: "",
        historyRollCall: "",
    })

    const [redNotice, setRedNotice] = useState({
        name: false,
        location: false,
        linkOnline: false,
        nameStudent: [false],
    })

    const [studentArr, setStudentArr] = useState([initStudentInfor]);

    const [StudentFromMyStudents, setStudentFromMyStudents] = useState([null])



    const ordinalNumber = (number) => {
        switch (number) {
            case 1:
                return("1st");
            case 2:
                return("2nd");
            case 3:
                return("3rd");
            default:
                return(number + "th")
        }
    } 


    const takeValue = (key, index) => {
        switch (key) {
            case "day": 
                return(daysOfWeek[index]);
        
            case "times": 
                return(timesInDay[index]);
        
            case "duration": 
                return(durationTimes[index]);
        
            case "travelTime": 
                return(travelTime[index]);
        
            default:
                break;
        }
    }

    

    const handleChange = async (key, data) => {
        let initClass = {...newClass};
        const workInChangeTimesProp = async (i, iv, key) => {
            let newArr2 = [...daysChoosen];
            newArr2.map((v, index) => {
                if(i === index) {
                    const dataNeedSet = takeValue(key, iv);
                    switch (key) {
                        case "day":
                            newArr2[index].day = dataNeedSet;
                            break;
                        case "times":
                            newArr2[index].times = dataNeedSet;
                            break;
                        case "duration":
                            newArr2[index].duration = dataNeedSet;
                            break;
                        case "travelTime":
                            newArr2[index].travelTime = dataNeedSet;
                            break;
                    
                        default:
                            break;
                    }
                }
            })
            await setDaysChoosen(newArr2);
            initClass.schedule = [...newArr2]
        }
        
        const newRedNotice = {...redNotice};
        switch (key) {
            case "map":
                if (data.indexOf(' ') !== -1) {
                    let aLink = data.split(" ")
                    let indexLink = aLink.findIndex((v) => {
                        return(v.indexOf('src="') !== -1) 
                    })
                    if(indexLink !== -1) {
                        let link = aLink[indexLink].replace('src="', '').slice(0, -1);
                        initClass[key] = link;
                    }
                }
                break;

            case "dayChoosen" : 
                let newArr = [...daysChoosen];
                let newUseSharedTravelTimeArr = [...useSharedTravelTime]

                if (newArr.length < data) {
                    let x = data -  newArr.length;
                    for (let i=1; i <= x; i++) {
                        newUseSharedTravelTimeArr.push(false);
                        newArr.push({day: "Monday", times: "00:00", duration: 1, travelTime: "00:00"});
                    }
                } else {
                    let x = newArr.length - data;
                    for (let i=1; i <= x; i++) {
                        newArr.splice(- 1, 1);
                        newUseSharedTravelTimeArr.splice(-1, 1);
                    }
                }
                await setDaysChoosen(newArr);
                await setUseSharedTravelTime(newUseSharedTravelTimeArr);
                initClass.schedule = [...newArr]
                break;
                case "travelTime": 
                case "day":
                case "times": 
                case "duration": 
                    workInChangeTimesProp(data.i, data.iv, key)
                    break;
                
                case "fixed":
                    initClass.schedule.fixed = data
                    break;
                case "scheduleNote":
                    initClass.schedule.note = data
                    break;


                case "name": 
                    newRedNotice.name = false;
                    initClass[key] = data;
                    setRedNotice(newRedNotice);
                    break;
                case "location":
                case "linkOnline":
                    newRedNotice.location = false;
                    newRedNotice.linkOnline = false;
                    initClass[key] = data;
                    setRedNotice(newRedNotice);
                    break;
         
            default:
                break;
        }
        await setNewClass(initClass)
    }
    
    const [otherNote, setOtherNote] = useState("Học mỗi tuần 2 buổi, báo lịch tuần sau vào ngày thứ 7 hàng tuần")

    const [renderFromOther, setRenderFromOther] = useState(false);

    useEffect(() => {
        let initNewClass = {...newClass};
        if(!newClass.schedule.fixed) {
            initNewClass.schedule.note = otherNote;
            setNewClass(initNewClass);
        } 
    },  [newClass.schedule.fixed])

    
    const onModalSameTravelTime = useSelector(state => state.onModalSameTravelTimeReducer.onModal);
    
    const sharedTravelTime = useSelector(state => state.sharedTravelTimeReducer.time);

    const reRenderSameTravelTime = useSelector(state => state.reRenderSameTravelTimeReducer.reRender);


    useEffect(() => {
        if(sharedTravelTime !== "" && reRenderSameTravelTime) {
            let initClass = {...newClass} 
            let newUseSharedTravelTimeArr  = [...useSharedTravelTime]
            initClass.schedule.map((v, i) => {
                v.travelTime = sharedTravelTime;
                newUseSharedTravelTimeArr[i] = true;
            })
            setNewClass(initClass);
            setUseSharedTravelTime(newUseSharedTravelTimeArr);
            dispatch(reRenderSameTravelTimeAction(false));
        }
    },  [sharedTravelTime, reRenderSameTravelTime])

    const handleEditTravelTime = (index) => {
        let newUseSharedTravelTimeArr = [...useSharedTravelTime];
        let initNewClass = {...newClass};
        initNewClass.schedule[index].travelTime = "00:00";
        newUseSharedTravelTimeArr[index] = false;
        setUseSharedTravelTime(newUseSharedTravelTimeArr);
        setNewClass(initNewClass);
    }

    const [collectMoneyAtBeginMonth, setCollectMoneyAtBeginMonth] = useState(false);

    const [fee, setFee] = useState('');
    const [numberOfLessons, setNumberOfLessons] = useState(1);

    const getStringMoney = (money) => {
        let str = String(money);
        let arr = [];
        if(str.length > 3){
            for (let i = str.length-3; i>0; i-=3) {
                arr.push(str[i] + str[i+1] + str[i+2])
            } 
        }
        let unit = 1000;
        for(let i = 1; i<arr.length; i++) {
            unit = unit * 1000;
        }
        if(money === 0) {
            arr.push('0');
        } else {
            arr.push(String(Math.floor(money/unit)))
        }
        let result = '';
        for (let i = arr.length-1; i>=0; i--) {
            if(i !== 0) {
                result = result + arr[i] + '.';
            } else {
                result = result + arr[i];
            }
        }
        return(result);
    }

    const checkValue = (setState, data, key) => {
        let number = Number(data)
        
        if(data = '') {
            setState(data);
        } else {
            if(number > 0 ) {
                setState(number)
            } else {
                if(key === "NumberOfLessons") {
                    setState(1);
                } else {
                setState('');
                }
            }
        }
       
    }

    const sexArr = ["---" , "Male", "Female"]
   
    const [showStudent, setShowStudent] = useState([false]);

    const [choosenInMyStudents, setChoosenInMyStudents] = useState([false]);

    const handleChangeStudent = (key, value) => {
        let cloneStudentArr = [...studentArr];
        let index = value.i;
        let data = value.iv
        const newRedNotice = {...redNotice}; 
        switch (key) {
            case "name":
                newRedNotice.nameStudent[index] = false;
                setRedNotice(newRedNotice);
                setSearchWord(data);
            case "sex":
            case "address":
            case "email":
                cloneStudentArr[index][key] = data;
                break;
            case "age": 
                if(data === "") {
                    cloneStudentArr[index][key] = "";
                } else {
                    if(data > 0) {
                        cloneStudentArr[index][key] = data;
                    } else {
                        cloneStudentArr[index][key] = ""; 
                    }
                }
                break;

            case "phone": 
                if (!/^\d+$/.test(data) && data !== "") {
                    alert("Vui lòng chỉ nhập số.");
                } else {
                    cloneStudentArr[index][key] = data
                }
                break;

            case "nameParents":
            case "sexParents":
            case "addressParents":
            case "emailParents":
                cloneStudentArr[index].parents[key.replace("Parents", "")] = data;
                break;

            case "ageParents": 
                if(data === "") {
                    cloneStudentArr[index].parents[key.replace("Parents","")] = "";
                } else {
                    if(data > 0) {
                        cloneStudentArr[index].parents[key.replace("Parents", "")] = data;
                    } else {
                        cloneStudentArr[index].parents[key.replace("Parents", "")] = ""; 
                    }
                }
                break;

            case "phoneParents": 
                if (!/^\d+$/.test(data) && data !== "") {
                    alert("Vui lòng chỉ nhập số.");
                } else {
                    cloneStudentArr[index].parents[key.replace("Parents", "")] = data
                }
                break;
            default:
                break;
        }
        setStudentArr(cloneStudentArr);
    }


    const handleClickAddStudentInClass = () => {
        let cloneShowStudent = [...showStudent, false];
        let cloneStudentFromMyStudents = [...StudentFromMyStudents, null];
        let cloneChoosenInMyStudents = [...choosenInMyStudents, false];
        let cloneStudentArr = [...studentArr];
        let cloneNewClass = {...newClass};
        let cloneRedNotice = {...redNotice};
        initStudentInfor.id = createAnIDStudent();
        cloneNewClass.students.push(initStudentInfor.id);
        cloneStudentArr.push(initStudentInfor);
        cloneRedNotice.nameStudent.push(false);
        setNewClass(cloneNewClass);
        setShowStudent(cloneShowStudent)
        setStudentArr(cloneStudentArr);
        setRedNotice(cloneRedNotice);
        setChoosenInMyStudents(cloneChoosenInMyStudents);
        setStudentFromMyStudents(cloneStudentFromMyStudents);
    }



    const handleClickDeleteAStudent = async (i) => {
        let cloneNewClass = {...newClass};
        let cloneStudentArr = [...studentArr];
        let cloneShowStudent = [...showStudent];
        let cloneChoosenInMyStudents = [...choosenInMyStudents];
        let cloneRedNotice = {...redNotice};
        let cloneStudentFromMyStudents = [...StudentFromMyStudents];
        await new Promise((resolve) => {
            if(i === 0 && studentArr.length === 1) {
                cloneStudentArr[0] = initStudentInfor;
                cloneStudentArr[0].id = createAnIDStudent();
                cloneChoosenInMyStudents[0] = false;
            } else {
                cloneStudentArr.splice(i,1);
                cloneNewClass.students.splice(i, 1);
                cloneRedNotice.nameStudent.splice(i, 1);
                cloneShowStudent.splice(i, 1);
                cloneChoosenInMyStudents.splice(i,1);
                cloneStudentFromMyStudents.splice(i,1);
            }

            resolve();
        })
        await setNewClass(cloneNewClass);
        await setStudentArr(cloneStudentArr);
        await setShowStudent(cloneShowStudent);
        await setRedNotice(cloneRedNotice);        
        await setChoosenInMyStudents(cloneChoosenInMyStudents);
        await setStudentFromMyStudents(cloneStudentFromMyStudents);
        
    }

    const handleSetShowStudent = (index, value) => {
        let cloneShowStudent = [...showStudent]
        cloneShowStudent[index] = value;    
        setShowStudent(cloneShowStudent);
    }
    //state này để quản lý việc bạt/ tắt cùa modal chọn một student trong my student
    const onModalChooseAStudentInMyStudentState = useSelector(state => state.onModalChooseAStudentInMyStudentReducer.onModal)

    const handleClickChooseStudent = (index) => {
        dispatch(onModalChooseAStudentInMyStudents(true, index));
        
        // let cloneChoosenInMyStudents = [...choosenInMyStudents];
        // cloneChoosenInMyStudents[index] = true;
        // setChoosenInMyStudents(cloneChoosenInMyStudents);
    }


    const ScrollToRef = (ref) => {
        if (typeof(ref) === "string") {
            const targetElement = document.getElementById(ref);
            if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
        } else {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    }


    const checkAllValue = () => {
        let refTo = null;
        let result = true;
        let newNamestudent = [...redNotice.nameStudent];
        for (let i = studentArr.length; i>0; i--) {
            if(studentArr[i-1].name === "") {
                result = false;
                refTo = `studentName${i-1}`;
                newNamestudent[i-1] = true;
            }
        }
        setRedNotice((prevRedNotice) => ({
            ...prevRedNotice,
            nameStudent: newNamestudent,
        }))
        if(!onlineClass) {
            if(newClass.location === "") {
                result = false;
                refTo = locationRef;
                setRedNotice((prevState) => ({
                    ...prevState,
                    location: true,
                }))
            }
        } else {
            if(newClass.linkOnline === "") {
                result = false;
                refTo = linkOnlineRef;
                setRedNotice((prevState) => ({
                    ...prevState,
                    linkOnline: true
                }))
            }
        }
        if(newClass.name === "") {
            refTo = nameRef;
            result = false;
            setRedNotice((prevState) => ({
                ...prevState,
                name: true,
            }))
        }

        if(refTo !== null) {
            ScrollToRef(refTo);
        }
       
        
        return(result);
    }

    const handleSaveClass = () => {
        const idClass = createAnIDStudent();
        let cloneNewClass = {...newClass};
        if(checkAllValue()) {
            cloneNewClass.id = idClass;
            const fetchData = async () => {
                await dispatch(addStudentsAction({data: studentArr, uid: localStorage.getItem("uid")}));
                await dispatch(addClassAction(idClass, cloneNewClass));
                await location.reload()             
            }
            if(localStorage.getItem("uid")) {
                fetchData();
            } else {
                dispatch(onModalNoticeAction(true));
                setNotice('Please Log in Frist!')
            }
        }
    }

    const [backupNumberOfLessons, setBackupNumberOfLessons] = useState(1);

    useEffect(() => {
        if(!numberOfLessons) {
            setBackupNumberOfLessons(1);
        } else {
            setBackupNumberOfLessons(numberOfLessons)
        }
    }, [numberOfLessons])

    useEffect(() => {
        let cloneNewClass = {...newClass};
        cloneNewClass.fee = Math.floor(fee/backupNumberOfLessons)
        setNewClass(cloneNewClass);
    }, [fee, backupNumberOfLessons, numberOfLessons])

    const allStudentsName = useSelector(state => state.getAllStudentsNameReducer.data.data);    
    
    const [resultSearch, setResultSearch] = useState([]);

    const [searchWord, setSearchWord] = useState('');
    const [studentFocus, setStudentFocus] = useState(-1);

    const searchFunc = (word) => {
        let cloneResultSearch = [...allStudentsName];
        let newResult = [];
        cloneResultSearch.map((v, i) => {
            let lKey = v.key.toLowerCase();
            let lWord = word.toLowerCase();
            if(lKey.indexOf(lWord) !== -1) {
                newResult.push(v);
            }
        })
        setResultSearch(newResult);
    }
    
    const callSearch = () => {
        if(searchWord !== "") {
            searchFunc(searchWord);
        } else {
            setResultSearch(allStudentsName);
        }
    }

    useEffect(() => {
        callSearch()

    }, [searchWord])

    //Bật susggest box lên
    const handleStudentFocus = (index) => {
        setResultSearch(allStudentsName);
        setStudentFocus(index)
        setSearchWord(studentArr[index].name)
        callSearch()
    }

    //setTimeout, mục đích để có thời gian cho dispatch tại vị trí suggest block Item 
    //có thể gởi đi trước khi onBlur được kích hoạt
    const handleStudentBlur = () => {
        setTimeout(() => {
            setStudentFocus(-1)
        }, [500])
    }

    //Func xử lý việc hiển thị bằng dạng nhập hay dạng xem đối với student 
    //khi có tương tác từ suggest box
    const handleClickFromSuggestBlock = (i, v) => {
        dispatch(setStudentFromMyStudent(i, v));
        let cloneChoosenInMyStudents = [...choosenInMyStudents]
        cloneChoosenInMyStudents[i] = true;
        setChoosenInMyStudents(cloneChoosenInMyStudents)
    }

    //State này để quản truyền thông tin từ các nguồn khác nhau về việc student thứ mấy sẽ được chọn từ "myStudents" 
    //và data của Student được chọn là gì
    const StudentFromMyStudentState = useSelector(state => state.setStudentFromMyStudentReducer.data)

    useEffect(() => {
        //Mảng "StudentFromMyStudents" dùng để render ra cho component blockStudentInfoPreview
        if(StudentFromMyStudentState.value) {
            let cloneChoosenInMyStudents = [...choosenInMyStudents]
            cloneChoosenInMyStudents[StudentFromMyStudentState.index] = true;
            setChoosenInMyStudents(cloneChoosenInMyStudents)
            let cloneStudentFromMyStudents = [...StudentFromMyStudents];
            let cloneStudentArr = [...studentArr];
            let cloneNewClass = {...newClass};
            cloneNewClass.students[StudentFromMyStudentState.index] = StudentFromMyStudentState.value.value.id;
            setNewClass(cloneNewClass);
            cloneStudentFromMyStudents[StudentFromMyStudentState.index] = StudentFromMyStudentState.value.value
            cloneStudentArr[StudentFromMyStudentState.index] = StudentFromMyStudentState.value.value
            setStudentFromMyStudents(cloneStudentFromMyStudents);
            setStudentArr(cloneStudentArr);
        }
    }, [StudentFromMyStudentState]);

    const onModalNoticeState = useSelector(state => state.onModalNoticeReducer.onModal);



    return(
        <>
            {onModalNoticeState && <ModalTemplateNotice closeFunc={() => {dispatch(onModalNoticeAction(false))}} message={notice}/>}
            {onModalSameTravelTime && <ModalTemplate element={<ModalSetSameTravelTime/>}/>}
            {onModalChooseAStudentInMyStudentState && <ModalTemplate element={<ModalChooseAStudentFromMyStudents/>}/>}
            <div className={styles.containerBox}>
                <div className={styles.header}>
                    <div className={styles.title}>Create A Class</div>
                    <svg className={styles.closeBtn} onClick={() => {dispatch(onFirstRegisterClass(false))}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>
                <div className={styles.body}>
                    <div className={`${styles.blockInput} ${redNotice.name && styles.redNotice}`}>
                        <div ref={nameRef} className={`${styles.label}`}>Class Name:</div>
                        <input onChange={(e) => {handleChange("name", e.target.value)}}/>
                    </div>
                    <div className={styles.blockTickOnlineClass}>
                    {onlineClass ?
                        <svg onClick={() => {setOnlineClass(false); handleChange("location", "");}} xmlns="http://www.w3.org/2000/svg" fill="green" className={styles.toggleSwitch} viewBox="0 0 16 16">
                            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                        </svg> :
                        <svg onClick={() => {setOnlineClass(true); handleChange("location", "online"); handleChange("linkOnline", "")}} xmlns="http://www.w3.org/2000/svg" fill="black" className={styles.toggleSwitch} viewBox="0 0 16 16">
                            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                        </svg>
                    } <div>Online Class</div>
                    </div>
                    {!onlineClass ?
                        <>
                            <div className={`${styles.blockInput} ${redNotice.location && styles.redNotice}`}>
                                <div ref={locationRef} className={`${styles.label}`}>Location:</div>
                                <input onChange={(e) => {handleChange("location", e.target.value)}} value={newClass.location}/>
                            </div>
                            <div className={styles.blockInput}>
                                <div className={styles.label}>Map:</div>
                                <input onChange={(e) => {handleChange("map", e.target.value)}}/>
                                <div className={styles.mapInstructionsLabel}>We support directly integrating maps into personal information. <Link to={"/doc/map"}>Click here</Link> to view instructions!</div>
                            </div>
                        </> :
                        <>
                            <div ref={linkOnlineRef} className={`${styles.blockInput} ${redNotice.linkOnline && styles.redNotice}`}>
                                <div>This class is an online class, please enter the link for the class in the space below.</div>
                                <input value={newClass.linkOnline} placeholder='Enter the class link here.' onChange={(e) => {handleChange("linkOnline", e.target.value)}}/>
                            </div>
                        </>
                    }
                    <div className={styles.blockInput}>
                        <div className={styles.label}>Times:</div>
                        <div className={styles.timeBlock}>

                            <div className={styles.containerToggleSwitch}>
                                <div className={styles.leftSide}>
                                    <div className={styles.blockToggleSwitch}>
                                        <div className={styles.containerToggleicon}>
                                            { newClass.schedule.fixed ?
                                                <svg onClick={() => {handleChange("fixed", false)}} xmlns="http://www.w3.org/2000/svg" fill="green" className={styles.toggleSwitch} viewBox="0 0 16 16">
                                                    <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                                </svg> :
                                                <svg onClick={() => {handleChange("fixed", true)}} xmlns="http://www.w3.org/2000/svg" fill="black" className={styles.toggleSwitch} viewBox="0 0 16 16">
                                                    <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                                </svg>
                                            }
                                        </div>
                                        <div className={styles.lableToggle}>
                                            Fixed Schedule
                                        </div>
                                    </div>
                                </div>
                                {newClass.schedule.fixed && 
                                    <div className={styles.rightSide}>
                                        <div className={styles.linkToModal}>
                                            <div onClick={() => {dispatch(onModalSameTravelTimeAction(true))}} className={styles.lableToggle}>
                                                Set the same travel time for all lessons.
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                            {(newClass.schedule.fixed) ? 
                            <>
                                <div className={styles.BlockDaysPerWeek}>
                                    <div className={styles.label}>Days Per Week:</div>
                                    <select onChange={(e) => {handleChange("dayChoosen", e.target.options[e.target.selectedIndex].value)}} className={styles.select}>
                                        {daysOfWeek.map((v, i) => {
                                            return(
                                                <option key={v} className={`${styles.optionItem}`} value={i+1}>{i+1}</option>
                                                )
                                            })}
                                    </select>
                                </div>{
                                    (newClass.schedule.fixed) &&
                                    <>
                                        {daysChoosen.map((_, i) => {
                                            return(
                                                <>
                                                    <div className={styles.containerASectionInformation}>
                                                        <div className={styles.titleLesson}>
                                                            {ordinalNumber(i + 1)}{' Lesson'}
                                                        </div>
                                                        <div className={styles.block2Side}>
                                                            <div className={styles.leftSide}>
                                                                <select onChange={(e) => {
                                                                    handleChange("day", {i : i, iv : e.target.selectedIndex})
                                                                }}>
                                                                    {daysOfWeek.map((v,i) => {
                                                                        return(
                                                                            <option key={v} value={i}>{v}</option>
                                                                            )
                                                                        })}
                                                                </select>
                                                                <select onChange={(e) => {
                                                                    handleChange("times", {i: i, iv : e.target.selectedIndex})
                                                                }}>
                                                                    {timesInDay.map((v, i) => {
                                                                        return(
                                                                            <option key={v} value={i}>{v}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className={styles.rightSide}>
                                                                {!useSharedTravelTime[i] ? 
                                                                    <>
                                                                        <div>You can change commute time to the teaching location if you wish.</div>
                                                                        <select 
                                                                            onChange={(e) => {
                                                                                handleChange("travelTime", {i : i, iv : e.target.selectedIndex})
                                                                            }}>
                                                                            {travelTime.map((v,i) => {
                                                                                return(
                                                                                    <option key={v} value={i}>{v}</option>
                                                                                    )
                                                                                })}
                                                                        </select>
                                                                    </> :
                                                                    <>
                                                                        <div>The travel time is:</div>
                                                                        <div className={styles.blockTravelTime}>
                                                                            <div>{sharedTravelTime}</div> 
                                                                            <div onClick={() => {handleEditTravelTime(i)}} className={styles.editBtn}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                                                                </svg> 
                                                                                Edit
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }
                                                                
                                                            </div>
                                                        </div>
                                                        <div>Duration of the lesson:</div>
                                                        <div className={styles.blockDurations}>
                                                            <select className={i} onChange={(e) => {
                                                                handleChange("duration", {i : i ,iv : e.target.selectedIndex})
                                                            }}>
                                                                {durationTimes.map((v, i) => {
                                                                    return(
                                                                            <option key={i} value={i}>{v}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            <div> hours</div>
                                                        </div>
                                                    </div>
                                                    {i + 1 !== daysChoosen.length && 
                                                        <div className={styles.line}></div>
                                                    }
                                                </>
                                            )
                                        })}
                                    </>
                                }


                            </> : 
                            <>
                                <div className={styles.blockOther}>
                                    <div className={styles.label}>Other:</div>
                                    <textarea className={styles.textInput} onChange={(e) => {handleChange("scheduleNote" ,e.target.value)}} defaultValue={"Học mỗi tuần 2 buổi, báo lịch tuần sau vào ngày thứ 7 hàng tuần"}></textarea>
                                </div>
                            </>}
                        </div>
                    </div>
                    <div className={styles.blockInput}>
                        <div className={styles.label}>Tuition Fee:</div>
                        <div className={styles.blockToggle}>
                            { collectMoneyAtBeginMonth ?
                                <svg onClick={() => {setCollectMoneyAtBeginMonth(false)}} xmlns="http://www.w3.org/2000/svg" fill="green" className={styles.toggleSwitch} viewBox="0 0 16 16">
                                    <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                </svg> :
                                <svg onClick={() => {setCollectMoneyAtBeginMonth(true)}} xmlns="http://www.w3.org/2000/svg" fill="black" className={styles.toggleSwitch} viewBox="0 0 16 16">
                                    <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                </svg>
                            }
                            <div>Collecting tuition fees at the beginning of the month.</div>
                        </div>
                        <div className={styles.feeStructure}>
                            Fee Structure
                            <div className={styles.feeBlock}>
                                <div className={styles.anItemOfFeeBlock}>
                                    <div className={styles.label}>Fee:</div>
                                    <input type='number' value={fee} onChange={(e) => {setFee(Number(e.target.value)); checkValue(setFee, e.target.value);}} placeholder='Ex: 200'/>
                                    <div>THOUSAND VND</div>
                                </div>
                                <div className={styles.anItemOfFeeBlock}>
                                    <div className={styles.anItemOfFeeBlock}>per</div>
                                    <input type='number' value={numberOfLessons} onChange={(e) => {setNumberOfLessons(Number(e.target.value)); checkValue(setNumberOfLessons, e.target.value)}} />
                                    {backupNumberOfLessons !== 1 ? <div>lessons</div> : <div>lesson</div>}
                                </div>
                            </div>
                            <div className={styles.reviewBlock}>
                                <div className={styles.reviewInputBlock}>
                                    <div>Review your input:</div>
                                    <div className={styles.reviewInput}>{getStringMoney(fee*1000)} VND/{backupNumberOfLessons} {(backupNumberOfLessons !== 1 || !backupNumberOfLessons) ? <div>lessons</div> : <div>lesson</div>}</div>
                                </div>
                                <div className={styles.reviewCostPerLessonBlock}>
                                    <div>Cost Per lesson:</div>
                                    <div className={styles.reviewCostPerLesson}>{getStringMoney(Math.floor(fee*1000/backupNumberOfLessons))} VND</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blockInput}>
                        <div className={styles.label}>Students:</div>
                        <div className={styles.studentQuantity}>Student Quantity: {studentArr.length}</div>
                        {studentArr.map((v,i) => {
                            return(
                                <div className={styles.containerFormStudent}>
                                    <div>Student {i+1}:</div>
                                    <div className={styles.interactionBlock}>
                                        {!showStudent[i] ?
                                            <svg onClick={() => {handleSetShowStudent(i, true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-arrow-bar-down ${styles.arrowBtn}`} viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5M8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6"/>
                                            </svg> :
                                            <svg onClick={() => {handleSetShowStudent(i, false)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-arrow-bar-up ${styles.arrowBtn}`} viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
                                            </svg>
                                        }
                                        {(i > 0 || choosenInMyStudents[i] === true) && 
                                            <svg className={styles.closeBtn} onClick={() => {handleClickDeleteAStudent(i)}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                            </svg>
                                        }
                                    </div>
                                    {!choosenInMyStudents[i] ? 
                                    <>  

                                        <div className={styles.linkToModalChooseStudent} onClick={() => {handleClickChooseStudent(i)}}>Choose a student in "My Students"?</div>
                                        <div className={`${styles.blockInput} ${redNotice.nameStudent[i] && styles.redNotice}`}>
                                        <div id={`studentName${i}`} className={styles.label}>Name</div>
                                        <div className={styles.containerInput}>
                                            <input placeholder={`Enter student's name`} value={studentArr[i].name} onFocus={() => handleStudentFocus(i)} onBlur={handleStudentBlur}  onChange={(e) => {handleChangeStudent("name", {i: i, iv: e.target.value})}} />
                                            {(studentFocus === i) && (resultSearch.length > 0) ? 
                                             <> 
                                                <div className={`${styles.containerSearchResult} ${!showStudent[i] && styles.smallSize}`}>
                                                    {resultSearch.map((v, i2) => {
                                                        return(
                                                            <div onClick={() => {handleClickFromSuggestBlock(i, v)}}>{v.key}</div>
                                                        )
                                                    })}
                                                </div>
                                            </> : null }
                                        </div>
                                        </div>
                                        {!showStudent[i] && 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                            </svg>
                                        }
                                        {showStudent[i] && 
                                            <>
                                                <div className={styles.blockInput}>
                                            <div className={styles.label}>Age</div>
                                            <input placeholder='Ex: 12, 20,..' type="number" value={studentArr[i].age} onChange={(e) => {handleChangeStudent("age", {i: i, iv: e.target.value})}} />
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Email</div>
                                            <input placeholder='Ex: studentABC@gmail.com' type="text" onChange={(e) => {handleChangeStudent("email", {i: i, iv: e.target.value})}} />
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Sex</div>
                                            <select className={styles.selectTag} onChange={(e) => {handleChangeStudent("sex", {i: i, iv: sexArr[e.target.selectedIndex]})}}>
                                                {sexArr.map((v,_) => {
                                                    return(
                                                        <option className={v}>{v}</option>
                                                    )
                                                }) }
                                            </select>
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Phone</div>
                                            <input placeholder='Ex: 034337xxxx' type="text" value={studentArr[i].phone} onChange={(e) => {handleChangeStudent("phone", {i: i, iv: e.target.value})}} />
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Address</div>
                                            <input placeholder='Ex: 123, Tan Lap, Dong Hoa, Di An, Binh Duong' type="text" onChange={(e) => {handleChangeStudent("address", {i: i, iv: e.target.value})}} />
                                        </div>
                                        
                                        <div className={styles.blockParents}>
                                            <div className={styles.title}>
                                                Parents Information
                                            </div>
                                            <div className={styles.blockInput}>
                                                <div className={styles.label}>Name</div>
                                                <input placeholder={`Enter parents's name`} onChange={(e) => {handleChangeStudent("nameParents", {i: i, iv: e.target.value})}} />
                                            </div>
                                            <div className={styles.blockInput}>
                                                <div className={styles.label}>Age</div>
                                                <input placeholder='Ex: 40, 30,..' type="number" value={studentArr[i].parents.age} onChange={(e) => {handleChangeStudent("ageParents", {i: i, iv: e.target.value})}} />
                                            </div>
                                            <div className={styles.blockInput}>
                                            <div className={styles.label}>Email</div>
                                            <input placeholder='Ex: studentABC@gmail.com' type="text" onChange={(e) => {handleChangeStudent("emailParents", {i: i, iv: e.target.value})}} />
                                        </div>
                                            <div className={styles.blockInput}>
                                                <div className={styles.label}>Sex</div>
                                                    <select className={styles.selectTag} onChange={(e) => {handleChangeStudent("sexParents", {i: i, iv: sexArr[e.target.selectedIndex]})}}>
                                                        {sexArr.map((v,_) => {
                                                            return(
                                                                <option className={v}>{v}</option>
                                                            )
                                                        }) }
                                                    </select>
                                                </div>
                                                <div className={styles.blockInput}>
                                                    <div className={styles.label}>Phone</div>
                                                    <input placeholder='Ex: 034337xxxx' type="text" value={studentArr[i].parents.phone} onChange={(e) => {handleChangeStudent("phoneParents", {i: i, iv: e.target.value})}} />
                                                </div>
                                                <div className={styles.blockInput}>
                                                    <div className={styles.label}>Address</div>
                                                    <input placeholder='Ex: 123, Tan Lap, Dong Hoa, Di An, Binh Duong' type="text" onChange={(e) => {handleChangeStudent("addressParents", {i: i, iv: e.target.value})}} />
                                                </div>
                                            </div>
                                            </>
                                        }
                                    </> : 
                                    <>  
                                        {/* <div className={styles.linkToModalChooseStudent} onClick={() => {handleClickChooseStudent(i)}}>Choose another student in "My Students"?</div>
                                        <div className={`${styles.blockInput} ${redNotice.nameStudent[i] && styles.redNotice}`}>
                                        <div id={`studentName${i}`} className={styles.label}>Name</div>
                                        <div className={styles.containerInput}>
                                            <input disabled placeholder={`empty`} />
                                            {(studentFocus === i) && (resultSearch) ? 
                                             <> 
                                                <div className={styles.containerSearchResult}>
                                                    {resultSearch.map((v, i) => {
                                                        return(
                                                            <div>{v.key}</div>
                                                        )
                                                    })}
                                                </div>
                                            </> : null }
                                        </div>
                                        </div>
                                        {!showStudent[i] && 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                            </svg>
                                        }
                                        {showStudent[i] && 
                                            <>
                                                <div className={styles.blockInput}>
                                            <div className={styles.label}>Age</div>
                                            <input disabled placeholder='empty' type="number"  />
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Email</div>
                                            <input disabled placeholder='empty' type="text"  />
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Sex</div>
                                            <select disabled className={styles.selectTag} >
                                                
                                                <option >---</option>
                                                
                                            </select>
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Phone</div>
                                            <input disabled placeholder='empty' type="text" />
                                        </div>
                                        <div className={styles.blockInput}>
                                            <div className={styles.label}>Address</div>
                                            <input disabled placeholder='empty' type="text" />
                                        </div>
                                        
                                        <div className={styles.blockParents}>
                                            <div className={styles.title}>
                                                Parents Information
                                            </div>
                                            <div className={styles.blockInput}>
                                                <div className={styles.label}>Name</div>
                                                <input disabled placeholder={`empty`}  />
                                            </div>
                                            <div className={styles.blockInput}>
                                                <div className={styles.label}>Age</div>
                                                <input disabled placeholder='empty' type="number"  />
                                            </div>
                                            <div className={styles.blockInput}>
                                            <div className={styles.label}>Email</div>
                                            <input disabled placeholder='empty' type="text"/>
                                        </div>
                                            <div className={styles.blockInput}>
                                                <div className={styles.label}>Sex</div>
                                                    <select disabled className={styles.selectTag} >
                                                        
                                                                <option >---</option>
                                                        
                                                    </select>
                                                </div>
                                                <div className={styles.blockInput}>
                                                    <div className={styles.label}>Phone</div>
                                                    <input disabled placeholder='empty' />
                                                </div>
                                                <div className={styles.blockInput}>
                                                    <div className={styles.label}>Address</div>
                                                    <input disabled placeholder='empty' type="text"/>
                                                </div>
                                            </div>
                                            </>
                                        }  */}
                                        {StudentFromMyStudents[i] !== null && <BlockStudentInfoPreview maximize={showStudent[i]} data={StudentFromMyStudents[i]} index={i}/>}
                                    </>}
                                    
                                </div>
                            )
                        })}
                        <div className={styles.addClass} onClick={() => {handleClickAddStudentInClass()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.blockBtnFinal}>
                        <div className={styles.cancelBtn} onClick={() => {dispatch(onFirstRegisterClass(false))}}>Cancel</div>
                        <div className={styles.saveBtn} onClick={() => handleSaveClass()}>Save Class</div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ModalFirstRegisterClass;