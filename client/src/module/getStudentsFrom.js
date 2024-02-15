// Tạo ra để có thể nhận vào một user và trả về một danh sách các lớp xếp theo tên rồi đến các thông tin


const getStudentsFrom = async (firstData, id) => {
    const finalData = []; 
    const promise = new Promise((resolve) => {
        for (let key in firstData.myStudents) {
            finalData.push({key: firstData.myStudents[key].name ,data: firstData.myStudents[key]})
        }
        resolve(finalData);
    })
    return await promise;
}

export default getStudentsFrom