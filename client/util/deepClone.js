export default function deepClone(obj){
    if(Array.isArray(obj)){
        return cloneArray(obj)
    }else if(obj instanceof Object) {
        return cloneObj(obj)
    }else{
        return obj
    }
}


function cloneArray(arr){
    let newArr = new Array(arr.length)
    for(let i = 0; i < arr.length; i++) {
        newArr[i] = deepClone(arr[i])
    }
    return newArr
}
function cloneObj(obj){
    let newObj = {}
    for(let key in obj){
        newObj[key] = deepClone(obj[key])
    }
    return newObj
}