/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-25 17:28:59
 * @LastEditTime: 2024-03-29 09:11:24
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\utils\AESHelper.js
 * @Description: AES加密模块
 */
var CryptoJS = require("crypto-js");

export default
class AESHelper {
    static privateKey = 'liuyongjie'
    /**
     * Description AES加密函数
     * @param {any} word:string 需要加密的字符串
     * @returns {string} 加密后的字符串
     */
    static encrypt(word) {
        const ciphertext = CryptoJS.AES.encrypt(
            word,
            this.privateKey
        ).toString()
        return ciphertext
    }
    /**
     * Description AES加密字符串解密
     * @param {any} word:string   加密后的字符串
     * @returns {string} 解密后的字符串
     */
    static decrypt(word) {
        let bytes = CryptoJS.AES.decrypt(word, this.privateKey)
        let originalText = bytes.toString(CryptoJS.enc.Utf8)
        return originalText
    }
}