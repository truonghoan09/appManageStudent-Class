    const { get, ref, getDatabase, set } = require("firebase/database");
    const { initializeApp } = require('firebase/app');
    const { firebaseConfig } = require("../firebase");



    initializeApp(firebaseConfig)



    exports.handler = async (event, context) => {
        const db = getDatabase();
        
        try {            
            let uid = JSON.parse(event.body).data.uid;
            let idClass = JSON.parse(event.body).data.idClass;
            let nextLessons = JSON.parse(event.body).data.nextLessons;

            const nextLessonRef = ref(db, "users/" + uid + "/myClasses/" + idClass + "/schedule/nextLessons/")
            let cloneNextLessons = [];
            const fetchData = async () => {
                cloneNextLessons = [...nextLessons];
                await set(nextLessonRef, cloneNextLessons.sort((a,b) => {return (new Date(a.date)) - (new Date(b.date))}));
            }
            fetchData();
            
            return{
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type"
                },
                body: JSON.stringify({
                    "errCode": 0,
                    "message": "Delete Schedule Next Lessons Func is Done"
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