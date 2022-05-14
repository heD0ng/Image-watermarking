// import {getAsyncComponent} from '../../util/lazyUtil.js'

export  function flatRoute(routes, sum) {
    return routes.reduce((sum, route) => {
        if (route.children?.length > 0) {
            sum = flatRoute(route.children, sum)
        } else {
            return [].concat(sum, route)
        }
    }, sum)
}