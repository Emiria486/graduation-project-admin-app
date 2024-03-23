/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 21:48:53
 * @LastEditTime: 2024-03-22 22:11:00
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\service\food_menu.js
 * @Description: 菜单管理api接口
 */
import {
    axiosInstance
} from './index'

/**
 * Description 获取菜单
 * @param {any} params 周几字符串，如'周一'
 * @returns {any}
 */
export function getFoodMenu(params) {
    return axiosInstance({
        method: 'get',
        url: '/food_menu',
        params
    })
}

export function addFoodMenu(data) {
    return axiosInstance({
        method: 'post',
        url: '/food_menu',
        data
    })
}
export function updateFoodMenuNum(data) {
    return axiosInstance({
        method: 'put',
        url: '/food_menu',
        data
    })
}

/**
 * Description 删除指定菜单条目
 * @param {any} params  food_menu_id
 * @returns {any}
 */
export function deleteFoodMenu(params) {
    return axiosInstance({
        method: 'delete',
        url: '/food_menu',
        params
    })
}