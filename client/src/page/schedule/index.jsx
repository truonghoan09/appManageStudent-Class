import { useSelector } from 'react-redux';
import styles from './schedule.module.scss'
import { useEffect, useState } from 'react';
import PickTimesAndDate from '../../component/pickTimesAndDate';

const SchedulePage = () => {

    // const dataState = useSelector(state => state.getUserDataReducer.data.getUserAPIData);
    const dataState = useSelector(state => state.getUserDataReducer.data.getUserAPIData);

    const [scheduleOneDay, setScheduleOneDay] = useState() 

    const [dateCurrentOnCalender, setDateCurrentOnCalender] = useState(new Date());

    const handleDataFromChild = (data) => {
        setDateCurrentOnCalender(data);
    }

    const roundToDate = (date) => {
        return(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    } 

    const calADaySchedule = (data, date) => {
        console.log(date);
        if(data && data.myClasses) {
            Object.keys(data.myClasses).forEach(key => {
                console.log(key);
            })
        }
    }

    useEffect(() => {
        console.log(dataState);
    }, [dataState])

    // useEffect(() => {
    //     if(dataState && dataState.data && dateCurrentOnCalender) {
    //         calADaySchedule(dataState.data, roundToDate(dateCurrentOnCalender))
    //     }
    // }, [dataState])

    const [showWeek, setShowWeek] = useState(true);


    const findMondayFrom = (date) => {
        const dateRound = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if(date.getDay() === 1){
            //thứ 2
            return(dateRound)
        } else {
            if(date.getDay() === 0) {
                //CN 
                return(new Date(dateRound.getTime() - 6*24*60*60*1000));
            } else {
                return(new Date(dateRound.getTime() - ((date.getDay() - 1)*24*60*60*1000)));
            }
        }
    }

    const findMinDate = (date) => {
        return(findMondayFrom(new Date(date.getTime() - 60*24*60*60*1000)));
    }

    



    return(
        <>
            {
                (dataState && dataState.errCode === 0) &&
                <div className={styles.container}>
                    <div className={styles.left}>
                        <PickTimesAndDate onDataFromChild={handleDataFromChild} clock={false} minDate={findMinDate(dateCurrentOnCalender)}/>
                        <div className={styles.blockToggleShowWeek}>
                            <div className={`${styles.itemBtn} ${showWeek && styles.choosen}`} onClick={() => {setShowWeek(true)}}>Week</div>
                            <div className={`${styles.itemBtn} ${!showWeek && styles.choosen}`} onClick={() => {setShowWeek(false)}}>Day</div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <>
                            {[...Array(24)].map((v,i) => {
                                return(
                                    <div className={`${styles.hourRow} ${styles.showWeek}`}>
                                        <div className={styles.labelHour}>{i < 10 ? "0" + i + ":00" : "" + i + ":00"}</div>
                                        {showWeek ? 
                                            <div className={styles.blockContentWeek}>
                                                A Week
                                            </div> : 
                                            <div className={styles.blockContentOneDay}>
                                                One Day
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </> 
                    </div>
                </div>
            }
        </>
    )
}

export default SchedulePage;