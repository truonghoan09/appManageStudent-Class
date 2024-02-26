import { useEffect, useState } from 'react';
import styles from './pickTimesAndDate.module.scss'
import DatePickerComponent from '../calendar';

const PickTimesAndDate = (Props) => {

    const roundToMinute = (date) => {
        if(date) {
            return(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
        }
    }

    //Props không nhất thiết phải có:
    //minDate truyền vào là một Date().getTime()
    let minDate = Props.minDate ? new Date(Props.minDate) : undefined;
    let clock = (!Props.clock) ? Props.clock : true
    let showBtn = Props.showBtn 

    const onDataFromChild = Props.onDataFromChild

    const [dateRequest, setDateRequest] = useState();
    const [currentTimesAndDate, setCurrentTimesAndDate] = useState(roundToMinute(new Date())); 

    useEffect(() => {
        if(minDate && new Date(yearInput, monthInput - 1, dateInput, hourInput, minuteInput) <= minDate) {
            setYearInput(minDate.getFullYear())
            setMonthInput(minDate.getMonth() + 1)
            setDateInput(minDate.getDate())
            setHourInput(minDate.getHours())
            setMinuteInput(minDate.getMinutes() + 1)
        }
    }, [minDate])

    const handleDataFromChild = (date) => {
        if(date) {
            let cloneCurrent = roundToMinute(date)   
            setDateInput(cloneCurrent.getDate());
            setMonthInput(cloneCurrent.getMonth() + 1);
            setYearInput(cloneCurrent.getFullYear());
        }
    }    

    const [dateInput, setDateInput] = useState(currentTimesAndDate.getDate());
    const [monthInput, setMonthInput] = useState(currentTimesAndDate.getMonth() + 1);
    const [yearInput, setYearInput] = useState(currentTimesAndDate.getFullYear());
    const [hourInput, setHourInput] = useState(currentTimesAndDate.getHours());
    const [minuteInput, setMinuteInput] = useState(currentTimesAndDate.getMinutes() + 1);

    const [preDate, setPreDate] = useState(new Date().getDate())
    const [preMonth, setPreMonth] = useState(new Date().getMonth())
    const [preYear, setPreYear] = useState(new Date().getFullYear())
    const [preHour, setPreHour] = useState(new Date().getHours() + 1)
    const [preMinute, setPreMinute] = useState(new Date().getMinutes())

    useEffect(() => {
        if(dateInput !== "" && monthInput !== "" && yearInput >= 1970) {
            setCurrentTimesAndDate(new Date(yearInput, monthInput - 1, dateInput));
            setDateRequest(new Date(yearInput, monthInput - 1, dateInput).getTime())
        }
    }, [dateInput, monthInput, yearInput])

    const checkInput = async (key, data) => {
        switch (key) {
            case "date":
                
                if(data === 0) {
                    setTimeout(() => setDateInput((prevDate) => prevDate || preDate), 1000);
                    setDateInput("");
                }  else { 
                        if (/^\d+$/.test(data) && 0 < Number(data) && Number(data) < 32 && new Date(yearInput, monthInput-1, Number(data)).getMonth() === monthInput-1) {
                            if(!minDate) {
                                setPreDate(data);
                                setDateInput(data);
                            } else {
                                if(new Date(yearInput, monthInput-1, Number(data), hourInput, minuteInput) > minDate) {
                                    setPreDate(data);
                                    setDateInput(data);
                                } else {
                                    setDateInput((prevDate) => prevDate || preDate);
                                }
                            }
                        } else {
                            setDateInput((prevDate) => prevDate || preDate);
                        }
                }
                break;
            case "month": 
                if(data === 0) {
                    setTimeout(() => setMonthInput((prevMonth) => prevMonth || preMonth), 1000);
                    setMonthInput("");
                }  else { 
                        if (/^\d+$/.test(data) && 0 < Number(data) && Number(data) < 13) {
                            if(!minDate) {
                                setPreMonth(Number(data));
                                setMonthInput(Number(data));
                            } else {
                                if(new Date(yearInput, Number(data) - 1, dateInput, hourInput, minuteInput) > minDate) {
                                    setPreMonth(Number(data));
                                    setMonthInput(Number(data));
                                } else {
                                    setMonthInput((prevMonth) => prevMonth || preMonth);
                                }
                            }
                        } else {
                            setMonthInput((prevMonth) => prevMonth || preMonth);
                        }
                }
                break;
            
            case "year": 
                if(Number(data) < 1970) {
                    setYearInput(data);
                    setTimeout(() => setYearInput((prevYear) => (prevYear < 1970) ? preYear : prevYear), 2000);
                }  else { 
                    if (/^\d+$/.test(data) && (Number(data) >= 1970) && (Number(data)/100000 < 1)) {
                        if(!minDate) {
                            setPreYear(Number(data));
                            setYearInput(Number(data)); 
                        } else {
                            if(new Date(Number(data), monthInput - 1, dateInput, hourInput, minuteInput) > minDate) {
                                setPreYear(Number(data));
                                setYearInput(Number(data));
                            } else {
                                setYearInput((prevYear) => prevYear || preYear);
                            }
                        }
                    } else {
                        setYearInput((prevYear) => prevYear || preYear);
                    }
                }
                break;
            case "hour": 
                if(Number(data) === 24) {
                    if(!minDate) {
                        setPreHour(0);
                        setHourInput(0);
                    } else {
                        if(new Date(yearInput, monthInput-1, dateInput, 0, minuteInput) > minDate) {
                            setPreHour(0);
                            setHourInput(0);
                        } else {
                            setTimeout(() => setHourInput((prevHour) => prevHour || preHour), 1000);
                        }
                    }
                } else {
                    if(Number(data) === -1) {
                        if(!minDate) {
                            setPreHour(23);
                            setHourInput(23);
                        } else {
                            if(new Date(yearInput, monthInput-1, dateInput, 23, minuteInput) > minDate) {
                                setPreHour(23);
                                setHourInput(23);
                            } else {
                                setTimeout(() => setHourInput((prevHour) => prevHour || preHour), 1000);
                            }
                        }
                    }
                    if (/^\d+$/.test(data) && 0 <= Number(data) && Number(data) < 24) {
                        if(!minDate) {
                            setPreHour(Number(data));
                            setHourInput(Number(data));
                        } else {
                            if(new Date(yearInput, monthInput-1, dateInput, Number(data), minuteInput) > minDate) {
                                setPreHour(Number(data));
                                setHourInput(Number(data));
                            } else {
                                setTimeout(() => setHourInput((prevHour) => prevHour || preHour), 1000);
                            }
                        }
                    } else {
                        setHourInput((prevHour) => prevHour || preHour);
                    }
                } 
                break;

            case "minute": 
                if(Number(data) === 60) {
                    if(!minDate) {
                        setPreMinute(0);
                        setMinuteInput(0);
                    } else {
                        if(new Date(yearInput, monthInput-1, dateInput, hourInput, 0) > minDate) {
                            setPreMinute(0);
                            setMinuteInput(0);
                        } else {
                            setTimeout(() => setMinuteInput((prevMinute) => prevMinute || preMinute), 1000);
                        }
                    }
                } else {
                    if(Number(data) === -1) {
                        if(!minDate) {
                            setPreMinute(59);
                            setMinuteInput(59);
                        } else {
                            if(new Date(yearInput, monthInput-1, dateInput, hourInput, 59) > minDate) {
                                setPreMinute(59);
                                setMinuteInput(59);
                            } else {
                                setTimeout(() => setMinuteInput((prevMinute) => prevMinute || preMinute), 1000);
                            }
                        }
                    }
                    if (/^\d+$/.test(data) && 0 <= Number(data) && Number(data) <= 59) {
                        if(!minDate) {
                            setPreMinute(Number(data));
                            setMinuteInput(Number(data));
                        } else {
                            if(new Date(yearInput, monthInput-1, dateInput, hourInput, Number(data)) >= minDate) {
                                setPreMinute(Number(data));
                                setMinuteInput(Number(data));
                            } else {
                                setTimeout(() => setMinuteInput((prevMinute) => prevMinute || preMinute), 1000);
                            }
                        }
                    } else {
                        setMinuteInput((prevMinute) => prevMinute || preMinute);
                    }
                } 
                break;
            default:
                break;
        }
    }

    let inputElements = document.getElementsByTagName('input');

    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener('focus', function() {
            this.select();
        });
    }

    useEffect(() => {
        if(!showBtn) {
            if(yearInput && monthInput && dateInput && hourInput && minuteInput){
                onDataFromChild(new Date(yearInput, monthInput - 1, dateInput, hourInput, minuteInput))
            }
        } 
    }, [yearInput, monthInput, dateInput, hourInput, minuteInput]);

    const handleClickCancelBtn = () => {
        console.log('click Cancel');
    }

    const handleClickPickBtn = () => {
        onDataFromChild(new Date(yearInput, monthInput - 1, dateInput, hourInput, minuteInput))
    }

    return(
        <div className={styles.container}>
            <div className={styles.blockInputDate}>
                <div className={styles.itemInput}>
                    <div className={styles.label}>Date</div>
                    <input type='number' className={styles.inputDate} onChange={(e) => checkInput("date", (e.target.value))} value={(dateInput < 10) ? "0" + Number(dateInput) : "" + Number(dateInput)} placeholder='dd'/>
                </div>
                <div className={styles.itemInput}>
                    <div className={styles.label}>Month</div>
                    <input type='number' className={styles.inputMonth} onChange={(e) => checkInput("month", (e.target.value))} value={(monthInput < 10) ? "0" + Number(monthInput) : "" + Number(monthInput)} placeholder='mm'/>
                </div>
                <div className={styles.itemInput}>
                    <div className={styles.label}>Year</div>
                    <input type='number' min={1970} max={99999} className={styles.inputYear} onChange={(e) => checkInput("year", (e.target.value))} value={yearInput} placeholder='yyyy'/>
                </div>
                {clock && 
                    <div className={styles.blockHourInput}>
                        <div className={styles.itemInput}>
                            <div className={styles.label}>Hour</div>
                            <input type='number' className={styles.inputHour} onChange={(e) => checkInput("hour", (e.target.value))} value={(hourInput < 10) ? "0" + Number(hourInput) : "" + Number(hourInput)} placeholder='hh'/>
                        </div>
                        <div className={styles.itemInput}>
                            <div className={styles.label}>minute</div>
                            <input type='number' className={styles.inputMinute} onChange={(e) => checkInput("minute", (e.target.value))} value={(minuteInput < 10) ? "0" + Number(minuteInput) : "" + Number(minuteInput)} placeholder='mm'/>
                        </div>
                    </div>
                }
            </div>
            <DatePickerComponent onDataFromChild={handleDataFromChild} currentDate={new Date().getTime()} dateRequest={dateRequest} minDate={minDate ? minDate.getTime() : undefined}/>
            {showBtn && 
                <>
                    <div className={styles.containerBtn}>
                        <div className={styles.blockBtn}>
                            <div className={styles.cancelBtn} onClick={() => handleClickCancelBtn()}>Cancel</div>
                            <div className={styles.pickBtn} onClick={() => handleClickPickBtn()}>Pick this day</div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default PickTimesAndDate;