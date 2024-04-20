/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 21:17:15
 * @LastEditTime: 2024-04-20 20:44:03
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\service\index.js
 * @Description: axios基础配置文件
 */
import axios from "axios";
import {
    Notification
} from "element-ui";
import {
    baseLoading,
    baseLoadingClose
} from "@/utils/loading";
import router from '../router'

export const API_BASE_URL = "http://localhost:4396/lyj"

// export const API_BASE_URL = "http://18.143.101.100:4396/lyj"


export function axiosInstance(config, isLoading = true) {
    let loading = null
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 5000,
    })
    instance.interceptors.request.use(config => {
        if (isLoading) {
            const target = document.getElementsByClassName('main')[0]
            loading = baseLoading(target)
        }
        const token = localStorage.getItem("adminToken")
        if (token) {
            config.headers.authorization = `Bearer ${token}`
            console.log("拦截器的token", config.headers.authorization)
        }
        return config
    })
    instance.interceptors.response.use(response => {
        baseLoadingClose(loading)
        if (!response.data.status) {
            Notification.error({
                title: '错误',
                message: response.data.message
            });
        }
        return response.data
    }, error => {
        baseLoadingClose(loading)
        if (error.message === 'Network Error') {
            Notification.error({
                title: '错误',
                message: '网络出现了一些状况，请稍后再试！',
                duration: 2000
            })
        }
        if (error.response.status === 401) {
            Notification.error({
                title: "错误",
                message: error.response.data.message,
                duration: 2000,
            })
            localStorage.removeItem('adminToken')
            router.push('/login')
        }
        return Promise.reject(error)
    })
    return instance(config)
}