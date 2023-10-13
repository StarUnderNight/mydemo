import axios from "axios";
import {ElMessage} from "element-plus";

/*
    内部使用的post和get请求
 */
const authItemName = "access_token"

const defaultFailure = (message, code, url) => {
    console.warn(`请求地址: ${url}, 状态码: ${code}, 错误信息: ${message}`)
    ElMessage.warning(message)

}

function takeAccessToken() {
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName)
    if (!str) {
        return null
    }
    const authObj = JSON.parse(str)

    // 过期验证
    if (authObj.expire <= new Date()) {
        deleteToken()
        ElMessage.warning("登录状态过期，请重新登录")
        return null
    }
    return authObj.token
}

function deleteToken() {
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}

/**
 * 存储token, localStorage本地长时间存储；sessionStorage:浏览器关闭之前
 * @param token
 * @param remember
 * @param expire
 */
function storeAccessToken(token, remember, expire) {
    const authObj = {
        token: token,
        expire: expire
    }
    const str = JSON.stringify(authObj)  // 转成字符串

    if (remember) {
        localStorage.setItem(authItemName, str);
    } else {
        sessionStorage.setItem(authItemName, str)
    }

}

const defaultError = (err) => {
    console.error(err)
    ElMessage.warning("发生错误，请联系系统管理员")

}
// Post
function internalPost(url, data, header, successFunc, failureFunc, errorFunc = defaultError) {
    axios.post(url, data, {headers:header}).then(({data}) => {
        if (data.code === 200) {
            successFunc(data.data)
        } else {
            failureFunc(data.message, data.code, url)
        }
    }).catch(err => errorFunc(err))
}

// Get
function internalGet(url, header, successFunc, failureFunc, errorFunc = defaultError) {
    axios.get(url, {headers:header}).then(({data}) => {
        if (data.code === 200) {
            successFunc(data.data)
        } else {
            failureFunc(data.message, data.code, url)
        }
    }).catch(err => errorFunc(err))
}

function accessHeader() {
    const token = takeAccessToken()
    return token ? {
        "Authorization": `Bearer ${takeAccessToken()}`
    } : {}
}

// 自己封装使用的get
function get(url, successFunc, failureFunc = defaultFailure) {
    internalGet(url, accessHeader(), successFunc, failureFunc)
}

// 自己封装使用的post
function post(url, data, successFunc, failureFunc = defaultFailure) {
    internalPost(url, data, accessHeader(), successFunc, failureFunc)
}


/**
 * 登录
 * @param username
 * @param password
 * @param remember
 * @param successFunc
 * @param failureFunc
 */
function login(username, password, remember, successFunc, failureFunc = defaultFailure) {
    internalPost("/api/auth/login", {
        username: username,
        password: password,
    }, {
        "Content-Type": "application/x-www-form-urlencoded"
    }, (data) => {
        storeAccessToken(data.token, remember, data.expire)
        ElMessage.success(`登录成功，欢迎${data.username}`)
        successFunc(data)
    }, failureFunc)
}

/**
 * 登出
 * @param successFunc
 * @param failureFunc
 */
function logout(successFunc, failureFunc = defaultFailure) {
    get("/api/auth/logout", () => {
        deleteToken()
        ElMessage.success("退出登录成功，欢迎再次使用")
        successFunc()
    }, failureFunc)
}

function unauthorized() {
    return !takeAccessToken()
}


// 暴露给其他组件使用
export {login, logout, get, post, unauthorized}