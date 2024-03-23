import {
    axiosInstance
} from './index'

export function login(data) {
    return axiosInstance({
        method: 'post',
        url: '/login',
        data
    }, false)
}