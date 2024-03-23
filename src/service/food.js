/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 21:50:17
 * @LastEditTime: 2024-03-22 22:01:14
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\service\food.js
 * @Description: 菜品管理api接口
 */
import {
    axiosInstance
} from './index'

export async function addNewFoodToMenu(data) {
    return axiosInstance({
        method: 'post',
        url: '/food',
        data
    })
}

export function getFood() {
    return axiosInstance({
        method: 'get',
        url: '/food'
    })
}

export function updateFoodInfo(data) {
    return axiosInstance({
        method: 'put',
        url: '/food',
        data
    })
}
/**
 * Description 删除菜品
 * @param {any} params food_id
 * @returns {any}   
 */
export function deleteFood(params) {
    return axiosInstance({
        method: 'delete',
        url: '/food',
        params
    })
}