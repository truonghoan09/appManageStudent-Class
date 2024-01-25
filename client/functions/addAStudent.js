exports.handler = async (event, context) => {

    try {
        let data = event.body;
        let id = JSON.parse(data).data[0].id;
        let errCode = 12345;
    
        console.log(id);
        return{ 
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization, Content-Type"
            },
            body: JSON.stringify({
                errCode: errCode, 
                data: id
            })
        }
    } catch (error) {
        console.log(error)
    }

}