import {ElMessage} from 'element-plus';

export function warnMessage(type='warning',message = ''){
    ElMessage[type]({
        type,
        message
    })
}