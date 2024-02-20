const { get, ref, getDatabase, set } = require("firebase/database");
const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require("../firebase");



initializeApp(firebaseConfig)



exports.handler = async (event, context) => {
    const db = getDatabase();
    try {
        let data = JSON.parse(event.body).data.data;
        let uid = JSON.parse(event.body).data.uid;
        const myClassesRef = ref(db, "users/" + uid + "/myClasses/");
        new Promise(async (resolve) => {
            await set(myClassesRef, data);
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
                "message": "Update After Remove Func is Done"
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