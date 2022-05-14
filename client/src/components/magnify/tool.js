export function getStyle(el, prop){
    // console.log(el.getBoundingClientRect())
    // getComputedStyle
    // return el.getBoundingClientRect()[prop]
    return parseInt(getComputedStyle(el)[prop])
}