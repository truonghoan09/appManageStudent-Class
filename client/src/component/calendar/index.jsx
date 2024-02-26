import { useEffect, useState } from 'react';
import styles from './calendar.module.scss'

const DatePickerComponent = (Props) => {

    const roundDate = (date) => {
        let newDate = date.getDate();
        let newMonth = date.getMonth();
        let newYear = date.getFullYear();
        return(new Date(newYear, newMonth, newDate));
    }

    //Props bắt buộc:
    let currentDateDefaut = new Date(Props.currentDate);
    let onDataFromChild = Props.onDataFromChild
    let dateRequest = Props.dateRequest;
    //Props không nhất thiết phải có:
    //minDate truyền vào là một Date().getTime()
    let minDate = Props.minDate ? roundDate(new Date(Props.minDate)) : undefined



    // const [now, setNow] = useState(new Date());
    const [currentDateState, setCurrentDateState] = useState(new Date());
    const [currentMonthState, setCurrentMonthState] = useState(0);
    const [currentYearState, setCurrentYearState] = useState(0);

    const labelDaysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const labelMonthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const [calendarToRender, setCalendarToRender] = useState([]);


    const calDateBlock = () => {
        
        let currentMonth = currentMonthState;
        let currentYear = currentYearState;
        let thisMonthArr = [];
        let resultMonthArr = [];

        for (let i = 1; i <= 31; i++) {
            let dateIndex = new Date(currentYear, currentMonth, i);

            // Kiểm tra xem ngày có thuộc về tháng hiện tại không
            if (dateIndex.getMonth() === currentMonth) {
                thisMonthArr.push({date: dateIndex})
            }
        }

        const createResultMonthArr = async () => {
            //ngày 1 không phải là thứ 2, phải tạo thêm khúc của tháng trước, nếu ngày 1 là thứ 2 thì bỏ qua đoạn này luôn
            if(thisMonthArr[0].date.getDay() !== 1) {
                if(thisMonthArr[0].date.getDay() === 0) {
                    //ngày 1 trúng vào ngày CN
                    for (let i = 1; i <= 6; i++) {
                        let dateInHere = new Date(thisMonthArr[0].date - (7 - i)*24*60*60*1000)
                        await resultMonthArr.push({enable: checkMinDate(roundDate(dateInHere)), inThisMonth: false, date: dateInHere})
                    }
                } else {
                    //ngày 1 không phải thứ 2 cũng không phải CN
                    for (let i = 1; i <= (thisMonthArr[0].date.getDay() - 1); i++) {
                        let dateInHere = new Date(thisMonthArr[0].date - (thisMonthArr[0].date.getDay() - i)*24*60*60*1000)
                        await resultMonthArr.push({enable: checkMinDate(roundDate(dateInHere)), inThisMonth: false, date: dateInHere})
                    }
                }
            } 
            //Đoạn này để thêm những ngày trong tháng vào mảng
            await thisMonthArr.map((v, i) => {
                resultMonthArr.push({enable: checkMinDate(roundDate(v.date)), inThisMonth: true, date: v.date});
            })
            //Đoạn này để kiểm coi ngày kết thúc có phải ngày CN không? Nếu đúng là ngày CN kết thúc thì cho qua luôn
            //nếu không phải là ngày CN là ngày kết tháng thì phải điền thêm mấy ngày tháng sau vô
            if(thisMonthArr[thisMonthArr.length -1].date.getDay() !== 0) {
                for (let i = 1 ; i <= (7 - thisMonthArr[thisMonthArr.length -1].date.getDay()); i++) {
                    let dateInHere = new Date(new Date(thisMonthArr[thisMonthArr.length -1].date).getTime() + i*24*60*60*1000)
                    await resultMonthArr.push({enable: checkMinDate(roundDate(dateInHere)), inThisMonth: false, date: dateInHere})
                }
            }
            let cloneCalendarToRender = [];
            await resultMonthArr.map((v, i) => {
                if(Math.floor(i/7) === cloneCalendarToRender.length) {
                    cloneCalendarToRender.push([v]);
                } else {
                    cloneCalendarToRender[Math.floor(i/7)].push(v);
                }
            })
            setCalendarToRender(cloneCalendarToRender);
        }
        createResultMonthArr();
    }

    const callSetCurrentState = async (date) => {
        await setCurrentDateState(roundDate(date).getTime());
        await setCurrentMonthState(date.getMonth());
        await setCurrentYearState(date.getFullYear());
    }


    useEffect(() => {
        if(currentDateDefaut) {
            const defineSchedule = async (dateDefaut) => {
                await callSetCurrentState(dateDefaut);
            } 
            defineSchedule(currentDateDefaut);
        }
    }, [])

    const [preDateRequest, setPreDateRequest] = useState();

    useEffect(() => {
        if(preDateRequest !== dateRequest) {
            callSetCurrentState(new Date(dateRequest))
            setPreDateRequest(dateRequest);
        }
    }, [dateRequest])
    
    
    useEffect(() => {
        calDateBlock();
    }, [currentMonthState, currentYearState])


    const checkMinDate = (dateNeedCheck) => {
        //return boolean -> true nghĩa là có thể chọn
        // false nghĩa là không được chọn
        //null nghĩa là không có mindate
        if(minDate) {
            if(dateNeedCheck.getTime() < minDate.getTime()) {
                return(false)
            } else {
                return true
            }
        } else {
            return null;
        }
    }

    const handleClickDate = async (dateObj) => {
        if(dateObj.enable === true || dateObj.enable === null) {
            await setCurrentDateState(roundDate(dateObj.date).getTime());
            if(dateObj.inThisMonth === false) {
                await setCurrentMonthState(dateObj.date.getMonth());
            } 
        } 
    }

    useEffect(() => {
        let dateNeedReturn = new Date(currentDateState);
        if(checkMinDate((dateNeedReturn)) === true || checkMinDate((dateNeedReturn)) === null) {
            onDataFromChild(new Date(currentDateState))
        }  
    }, [currentDateState])

    const handleChangeMonth = (action) => {
        if(action === "last") {
            if(currentMonthState === 0) {
                setCurrentMonthState(11);
                setCurrentYearState(currentYearState - 1)
            } else {setCurrentMonthState(currentMonthState - 1);}
            
        } else {
            if(currentMonthState === 11) {
                setCurrentMonthState(0);
                setCurrentYearState(currentYearState + 1)
            } else {setCurrentMonthState(currentMonthState + 1);}
        }
    }
        
    return(
        <div className={styles.container}>
            {calendarToRender && 
                <>  
                    <div className={styles.blockMonthYear}>
                        <svg onClick={() => handleChangeMonth('last')} xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-caret-left-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M10.205 12.456A.5.5 0 0 0 10.5 12V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4a.5.5 0 0 0 .537.082"/>
                        </svg>
                        <div className={styles.monthAndYearName}>{labelMonthsOfYear[currentMonthState]}, {currentYearState}</div>
                        <svg onClick={() => handleChangeMonth('next')} xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082"/>
                        </svg>
                    </div>
                    <div className={styles.labelDayBlock}>
                        {labelDaysOfWeek.map((v,i) => {
                            return(
                                <div className={styles.lable}>{v}</div>
                            )
                        })}
                    </div>
                    {
                        calendarToRender.map((v, i) => {
                            return(
                                <div className={styles.ARowOfCalendar}>
                                    {v && v.map((v2, i2) => {
                                        return(
                                            <div onClick={() => {handleClickDate(v2)}} className={`${v2.enable === false && styles.disable} ${styles.dayItem} ${v2.inThisMonth && styles.inMonth} ${(roundDate(v2.date).getTime() === currentDateState) && styles.currentDate}`}>
                                                {v2.date.getDate()}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </>

            }
        </div>
    )
}

export default DatePickerComponent;