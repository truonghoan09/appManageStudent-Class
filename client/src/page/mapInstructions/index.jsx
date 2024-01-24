import styles from "./mapInstructions.module.scss";
import pic1 from "../../assets/pic1.jpg"
import pic2 from "../../assets/pic2.jpg"
import pic3 from "../../assets/pic3.jpg"
import pic4 from "../../assets/pic4.jpg"
import pic5 from "../../assets/pic5.jpg"
import pic6 from "../../assets/pic6.jpg"
import pic7 from "../../assets/pic7.jpg"

const MapInstructions = () => {
    return(
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Instructions for integrating a map into your profile</h1>
                <div className={styles.step}>
                    <h3>Step 1:</h3>
                    <img className={styles.pic1} src={pic1}/>
                    <div className={styles.description}>
                        <div>- Enter information into the 'field' accurately as 'map'.</div>
                        <div>- Information in the 'Your information' field will be the link provided by Google Maps. Continue to step 2 for instructions on how to obtain the link.</div>
                    </div>
                </div>
                <div className={styles.step}>
                    <h3>Step 2:</h3>
                    <div className={styles.containerBlock}>
                        <img className={styles.pic2} src={pic2}/>
                        <div className={styles.labelFigure}>Figure 1</div>
                        <img className={styles.pic3} src={pic3}/>
                        <div className={styles.labelFigure}>Figure 2</div>
                        <div className={styles.description}>
                            <div>- You can search for an address on Google Maps (as shown in figure 1) or pin a location on Google Maps (as shown in figure 2).</div>
                        </div>
                    </div>
                    <div className={styles.containerBlock}>
                        <img className={styles.pic4} src={pic4}/>
                        <div className={styles.labelFigure}>Figure for "pin"</div>
                        <img className={styles.pic5} src={pic5}/>
                        <div className={styles.labelFigure}>Figure for "search"</div>
                        <div className={styles.description}>
                            <div>- Illustrated here are locations with the 'share' button, similar to those shown in the two above illustrations.</div>
                        </div>
                    </div>
                    <div className={styles.containerBlock}>
                        <img className={styles.pic6} src={pic6}/>
                        <div className={styles.labelFigure}>Share Window</div>
                        <div className={styles.description}>
                            <div>- When the share window appears, locate the 'embed map' section and click on it.</div>
                        </div>
                    </div>
                    <div className={styles.containerBlock}>
                        <img className={styles.pic7} src={pic7}/>
                        <div className={styles.labelFigure}>Embed map</div>
                        <div className={styles.description}>
                            <div>- Now, simply click on the 'Copy HTML' button, then go back and paste it into the 'Your information' section in step 1.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MapInstructions