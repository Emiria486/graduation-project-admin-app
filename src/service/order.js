/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 22:12:55
 * @LastEditTime: 2024-03-22 22:14:40
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\service\order.js
 * @Description: 订单管理类api
 */
import {
    axiosInstance
} from './index'

/**
 * Description
 * @param {any} params pageStart pageSize startTime endTime 时间字符串是'yyyy-mm-dd格式'
 * @returns {any}
 */
export async function getOrdersByDateAndPagination(params) {
    return axiosInstance({
        method: 'get',
        url: '/order_search',
        params
    })
}

export async function getOutstandingOrders(params) {
    return axiosInstance({
        method: 'get',
        url: '/outstanding-order',
        params
    })
}