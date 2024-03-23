/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 21:29:03
 * @LastEditTime: 2024-03-22 21:45:08
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\service\admin-info.js
 * @Description: 管理员信息api接口
 */
import {
    axiosInstance
} from './index'
export function getAdminInfo() {
    return axiosInstance({
        method: 'get',
        url: '/admin_info',
    })
}
export async function updateAdminInfo(data) {
    return axiosInstance({
        method: 'put',
        url: '/admin_info',
        data
    })
}
export function validatePass(data) {
    return axiosInstance({
        method: 'post',
        url: '/pass_validate',
        data
    })
}
export function updatePass(data) {
    return axiosInstance({
        method: 'put',
        url: '/pass_update',
        data
    })
}