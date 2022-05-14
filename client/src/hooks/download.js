export function download(id, fileName='press'){
    const dom = document.querySelector(`#${id}`).querySelector('canvas')
    console.log(dom);
    const imgUrl = dom.toDataURL()
    let a = document.createElement('a')
    a.download = fileName;
    a.href = imgUrl
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // document.appendChild: 有可能会报错
}