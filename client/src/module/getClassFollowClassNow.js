// Tạo ra để có thể nhận vào một user và trả về một danh sách các lớp xếp theo tên rồi đến các thông tin

const getClassFollowClassNow = async (firstData, id) => {
    let finalData = {}; 
    const promise = new Promise((resolve) => {
        finalData = firstData.myClasses[id]
        resolve(finalData);
    })
    return await promise;
}

export default getClassFollowClassNow