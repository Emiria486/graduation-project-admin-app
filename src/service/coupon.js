/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 21:16:55
 * @LastEditTime: 2024-03-22 21:48:46
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\service\coupon.js
 * @Description: 优惠劵管理api接口
 */
import {
    axiosInstance
} from './index'

export async function addCoupon(data) {
    return axiosInstance({
        method: 'post',
        url: '/coupon',
        data
    })
}