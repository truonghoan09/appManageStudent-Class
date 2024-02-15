    const { get, ref, getDatabase, set } = require("firebase/database");
    const { initializeApp } = require('firebase/app');
    const { firebaseConfig } = require("../firebase");



    initializeApp(firebaseConfig)



    exports.handler = async (event, context) => {
        const db = getDatabase();
        const today = new Date();
        try {            
            let uid = JSON.parse(event.body).data.uid;
            let idClass = JSON.parse(event.body).data.idClass;

            const nextLessonRef = ref(db, "users/" + uid + "/myClasses/" + idClass + "/schedule/nextLessons/")
            let cloneNextLessons = [];
            let reSult = [];
            const updateData = async () => {
                const snapshot = await get(nextLessonRef);
                if(snapshot.exists()) {
                    cloneNextLessons = [...snapshot.val()];
                    
                    cloneNextLessons.map((v, i) => {
                        if ((new Date(v.date)) > today) {
                            reSult.push(v);
                        }
                    })
                }
                await set(nextLessonRef, reSult.sort((a,b) => {return (new Date(a.date)) - (new Date(b.date))}));
            }
            updateData();
            
            return{
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type"
                },
                body: JSON.stringify({
                    "errCode": 0,
                    "message": "Update Schedule Next Lessons Follow Today Func is Done"
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