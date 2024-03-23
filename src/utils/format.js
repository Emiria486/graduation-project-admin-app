/**
 * Description 返回"yyyy-mm-dd hh:mm:ss"格式的字符串
 * @param {any} time    时间戳
 * @returns {any}
 */
export function dateFormat(time) {
    const date = new Date(time)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let second = date.getSeconds()

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (hour < 10) hour = '0' + hour
    if (minutes < 10) minutes = '0' + minutes
    if (second < 10) second = '0' + second
    return `${year}-${month}-${day} ${hour}:${minutes}:${second}`
}
/**
 * Description 根据传入时间字符串返回"周几"格式的字符串
 * @param {any} date "2024-3-23"格式字符串或new Date()
 * @returns {any}
 */
export function getWeekday(date = new Date()) {
    let weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
    let week = "周" + weekArray[new Date(date).getDay()]
    return week;
}