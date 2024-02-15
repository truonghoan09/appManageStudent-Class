// Tạo ra để có thể nhận vào một user và trả về một danh sách các lớp xếp theo tên rồi đến các thông tin


const getFristClass = async (firstData) => {
    let id = ""; 
    console.log(firstData.myClasses);
    const promise = new Promise((resolve) => {
        let count = 0;
        for (let key in firstData.myClasses) {
            if(count <= 0) {
                id = firstData.myClasses[key].id
                count++;
            }
        }
        resolve(id);
    })
    return await promise;
}

export default getFristClass