import { useDispatch } from "react-redux";
import { onModalChooseAStudentInMyStudents } from "../../redux/action";
import styles from "./BlockStudentInfoPreview.module.scss"

const BlockStudentInfoPreview = (Props) => {
    const maximize = Props.maximize;
    const data = Props.data
    const offLink = Props.offLink;
    const indexInCreateAClass = Props.index
    const dispatch = useDispatch();
    return(
        <>
            <div className={styles.containerFormStudent}>  
                {!offLink && <div className={styles.linkToModalChooseStudent} onClick={() => {dispatch(onModalChooseAStudentInMyStudents(true, indexInCreateAClass))}}>Choose another student in "My Students"?</div>}
                <div className={styles.paddingTop}></div>
                <div className={`${styles.blockInput}`}>
                    <div className={styles.label}>Name</div>
                    <div className={styles.containerInput}>
                        <input disabled placeholder={`empty`}  value={data.name}/>
                    </div>
                </div>
                {!maximize && 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                }
                {maximize && 
                    <>
                    <div className={styles.blockInput}>
                        <div className={styles.label}>Age</div>
                        <input disabled placeholder='empty' type="number" value={data.age} />
                </div>
                <div className={styles.blockInput}>
                    <div className={styles.label}>Email</div>
                    <input disabled placeholder='empty' type="text" value={data.email} />
                </div>
                <div className={styles.blockInput}>
                    <div className={styles.label}>Sex</div>
                    <select disabled className={styles.selectTag} >
                        
                        <option >{data.sex}</option>
                        
                    </select>
                </div>
                <div className={styles.blockInput}>
                    <div className={styles.label}>Phone</div>
                    <input disabled placeholder='empty' type="text" value={data.phone}/>
                </div>
                <div className={styles.blockInput}>
                    <div className={styles.label}>Address</div>
                    <input disabled placeholder='empty' type="text" value={data.address} />
                </div>
                
                <div className={styles.blockParents}>
                    <div className={styles.title}>
                        Parents Information
                    </div>
                    <div className={styles.blockInput}>
                        <div className={styles.label}>Name</div>
                        <input disabled placeholder={`empty`} value={data.parents.name} />
                    </div>
                    <div className={styles.blockInput}>
                        <div className={styles.label}>Age</div>
                        <input disabled placeholder='empty' type="number" value={data.parents.age} />
                    </div>
                    <div className={styles.blockInput}>
                    <div className={styles.label}>Email</div>
                    <input disabled placeholder='empty' type="text" value={data.parents.email}/>
                </div>
                    <div className={styles.blockInput}>
                        <div className={styles.label}>Sex</div>
                            <select disabled className={styles.selectTag} >
                                
                                        <option >{data.parents.sex}</option>
                                
                            </select>
                        </div>
                        <div className={styles.blockInput}>
                            <div className={styles.label}>Phone</div>
                            <input disabled placeholder='empty' value={data.parents.phone}/>
                        </div>
                        <div className={styles.blockInput}>
                            <div className={styles.label}>Address</div>
                            <input disabled placeholder='empty' type="text" value={data.parents.address}/>
                        </div>
                    </div>
                    </>
                }  

            </div>
        </>
    )
}

export default BlockStudentInfoPreview;