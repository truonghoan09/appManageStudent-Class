const { get, ref, getDatabase, set } = require("firebase/database");
const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require("../firebase");



initializeApp(firebaseConfig)


const sortNameFunc = (studentNameArr) => {
    let sortname = [];
    for (const key in studentNameArr) {
        sortname.push(key);
    }
    sortname.sort((a, b) => {
        let fa = a.toLowerCase(),
        fb = b.toLowerCase();
        
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    let cloneResultSearch = [];
    sortname.map((v, i) => {
        cloneResultSearch.push({key: v, value: studentNameArr[v]})
    })
    return(cloneResultSearch)
}
        

exports.handler = async (event, context) => {
    const db = getDatabase();
    try {
        
        let data = JSON.parse(event.body);
        console.log(data);
        let uid = data.uid;

        
        const aStudentRef = ref(db, "users/" + uid + "/myStudents/")
        const allStudentPromise = await get(aStudentRef);
        const allStudent = allStudentPromise.val();
        let Result = {};
        for (key in allStudent) {
            Result = {...Result, [allStudent[key].name] : allStudent[key]}
        }

        const FinalResultArr = await sortNameFunc(Result)
        
        return{ 
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type"
            },
            body: JSON.stringify({
                errCode: 0, 
                data: FinalResultArr,
            })
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                errCode: 500,
                message: "Internal Server Error"
            })
        }
    }

}