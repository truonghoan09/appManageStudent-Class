const { get, ref, getDatabase, set } = require("firebase/database");
const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require("../firebase");



initializeApp(firebaseConfig)



exports.handler = async (event, context) => {
    const db = getDatabase();
    try {
        let uid = JSON.parse(event.body).data;
        let data = {};
        let errCode = 0;
        let message = ""
        const AUserRef = ref(db, "users/" + uid);
        const snapShotUser = await get(AUserRef);
            if(snapShotUser.exists()) {
                data = snapShotUser.val();
                errCode = 0
                message = "Get value Complete!"
            } else {
                errCode = -1
                data = {}
                message = "user is not exists!"
            }
        return{ 
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type"
            },
            body: JSON.stringify({
                "errCode": errCode,
                "data": data, 
                "message": message,
            })
        }

    } catch (error) {
        console.log(error)
        if (error.code === "FIREBASE_ERROR_CODE") {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    "errCode": 400,
                    "message": "Lỗi cơ sở dữ liệu Firebase: " + error.message
                })
            };
        }    
        return {
            statusCode: 500,
            body: JSON.stringify({
                "errCode": 500,
                "message": "Internal Server Error"
            })
        }
    }

}