import request from "./request";


export async function uploadFile(data){
    return await request({'Content-type': 'multipart/form-data'})
        .post('/api/upload', data)
}

export async function pressImg(url) {
    console.log(url);
    return await request().get('/api/pressImg?fileName=' + url)
}