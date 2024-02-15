const { get, ref, getDatabase, set, update } = require("firebase/database");
const { firebaseConfig } = require("../firebase");
const { initializeApp } = require("firebase/app");


initializeApp(firebaseConfig)



exports.handler = async (event, context) => {
    let idClass = JSON.parse(event.body).data.idClass;
    let uid = JSON.parse(event.body).data.uid;
    let task = JSON.parse(event.body).data.task;
    const db = getDatabase();    

    try {
        const homeworkRef = ref(db, "users/" + uid + "/myClasses/" + idClass + "/homeWork");
        const homeWork = await get(homeworkRef);
        if(homeWork.exists()) {
            let homeWorkArr = [];
            if(homeWork === "") {
                homeWorkArr[0] = task; 
            } else {
                homeWorkArr = [...homeWork.val(), task];
            }
            set(homeworkRef, homeWorkArr);
        }

        return{ 
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type"
            },
            body: JSON.stringify({
                "errCode": 0, 
                "message": "Add homework Func is Done"
            })
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                "errCode": 500,
                "message": "Internal Server Error"
            })
        }
    }

}