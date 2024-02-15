const { get, ref, getDatabase, set } = require("firebase/database");
const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require("../firebase");



initializeApp(firebaseConfig)



exports.handler = async (event, context) => {
    const db = getDatabase();
    try {
        let id = JSON.parse(event.body).data.id;
        let data = JSON.parse(event.body).data.data;
        let uid = JSON.parse(event.body).data.uid;
        console.log(id)
        console.log(data);
        const AClassRef = ref(db, "users/" + uid + "/myClasses/" + id);
        new Promise(async (resolve) => {
            const snapShotClass = await get(AClassRef);
            if(!snapShotClass.exists()) {
                set(AClassRef, data);
            }
            resolve();
        })

        return{ 
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type"
            },
            body: JSON.stringify({
                "errCode": 0, 
                "message": "Add Class Func is Done"
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