// Tạo ra để có thể nhận vào một user và trả về một danh sách các lớp xếp theo tên rồi đến các thông tin


const getAllClassesFrom = async (firstData) => {
    const finalData = []; 
    const promise = new Promise((resolve) => {
        for (let key in firstData.myClasses) {
            finalData.push({key: firstData.myClasses[key].name ,data: firstData.myClasses[key]})
        }
        resolve(finalData);
    })
    return await promise;
}

export default getAllClassesFrom