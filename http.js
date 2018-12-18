const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json; charset=UTF-8');
// myHeaders.append('Access-Control-Allow-Origin', '*') // 后端也得有此响应才可跨域

const $http = {
    get(url, params) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        return new Promise((resolve, reject) => {
            fetch(url, {
                    methods: 'GET'
                })
                .then(res => Promise.all([res.ok, res.status, res.json()]))
                .then(([ok, status, json]) => {
                    // ok 返回的是 是否请求成功
                    // status 返回的是状态码
                    // json 返回的是当前的数据
                    if (ok && status >= 200 && status < 300) { // 判断是否成功与状态码是否在这个区间内
                        resolve(json)
                    } else {
                        reject(json.error)
                    }
                }).catch(err => { // 捕捉异常
                    reject(err)
                })
        })
    },
    post(url, params = {}) {
        let temp = ''
        if (Object.values(params).length != 0) {
            for (var i in params) {
                temp += `${i}=${params[i]}&`
            }
        }
        temp.slice(0, temp.length - 1)
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'POST',
                    // mode: 'cors', // 是否开启跨域访问
                    // credentials: 'include',
                    headers: myHeaders,
                    body: temp.length != 0 ? temp : ''
                })
                .then(res => Promise.all([res.ok, res.status, res.json()]))
                .then(([ok, status, json]) => {
                    if (ok && status == 200) {
                        resolve(json)
                    } else {
                        reject(json.error)
                    }
                }).catch(err => {
                    reject(err)
                })
        })
    },
    all(queryAll) {
        return Promise.all(queryAll)
    }
}

export default $http;