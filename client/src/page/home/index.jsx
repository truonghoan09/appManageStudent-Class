import { useEffect, useState } from 'react';
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { DataTest } from '../testData';
import { useDispatch, useSelector } from 'react-redux';
import { setClassnow } from '../../redux/action';


const Home = () => {
    // const [classNow, setClassNow] = useState('studentA');
    // const cloneTask = DataTest;

    // const dataArrived = JSON.stringify(cloneTask);
    const data = useSelector(state => state.setDataReducer.data);

    const dispatch = useDispatch();

    const classNow = useSelector(state => state.setClassnowReducer.class);


    return(
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Link className={styles.manage} to={"/manage"}>Manage</Link>
                </div>
                <div className={styles.headerPlaceholder}></div>
                
                {/* {(data[classNow] && data[classNow].task) && 
                    <div className={styles.taskContainer}>
                        <div className={styles.title}>Homework</div>
                        <div className={styles.taskBlock}> 
                            {
                                data[classNow].task.map((v,_) => {
                                    return( 
                                        <div className={styles.task}>
                                            {v}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                } */}
            </div>
        </>
    )
}

export default Home;