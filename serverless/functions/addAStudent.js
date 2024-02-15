    const { get, ref, getDatabase, set } = require("firebase/database");
    const { initializeApp } = require('firebase/app');
    const { firebaseConfig } = require("../firebase");



    initializeApp(firebaseConfig)



    exports.handler = async (event, context) => {
        const db = getDatabase();
        try {
            
            let data = JSON.parse(event.body).data;
            let studentArr = data.data;
            let uid = data.uid;

            studentArr.map(async (v, i) => {
                const aStudentRef = ref(db, "users/" + uid + "/myStudents/" + v.id)
                snapShotStudent = await get(aStudentRef);
                if(!snapShotStudent.exists()) {
                    await set(aStudentRef, v)
                }
            })
            
            return{ 
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type"
                },
                body: JSON.stringify({
                    "errCode": 0, 
                    "message": "Add student Func is Done"
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