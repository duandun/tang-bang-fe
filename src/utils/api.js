import $ from 'webpack-zepto';

// 测试用，如果localStorage.debugApiHost设置了host，取这个host
let debugHost = window.localStorage.debugApiHost;
const apiHostConf = {
    dev: {
        host: '10.95.118.68:8080',
        apiHost: '10.95.118.68:8080'
    },
    stage: {
        host: 'ss.com',
        apiHost: 'ss.com'
    },
    prod: {
        host: '10.95.118.68:8080',
        apiHost: '10.95.118.68:8080'
    }
};

let curEnv = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
let pageHost = window.location.host;
const host = debugHost || (function () {
    let arrEnv = Object.keys(apiHostConf);

    for (let env of arrEnv) {
        let item = apiHostConf[env];
        if (pageHost.indexOf(item.host) !== -1) {
            curEnv = env;
            break;
        }
    }
    console.info('apiHost use [%s]', curEnv);
    return apiHostConf[curEnv]['apiHost'];
})();

export function getApiHost() {
    return host;
}

const loginPageUrl = '';

export function url(path) {
    if (!path) {
        return path;
    }

    if (path.indexOf('http') !== -1) {
        return path;
    }

    return 'http://' + host + path;
}

const validMethods = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'];

function sendMessage(message) {
    return new Promise(function (resolve, reject) {
        var messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = function (event) {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };

        navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
    });
}

function handleParams(api, data, rawMethod) {
    let method = rawMethod;

    if (rawMethod && validMethods.indexOf(rawMethod) === -1) {
        data.method = 'GET';
        data._method = rawMethod;
    }
    let newUrl = url(api);

    if (rawMethod === 'GET') {
        // ver存在的时候, 删除sw中的cache
        if (data.ver) {
            delete data.ver;
            newUrl += '&' + $.param(data);
            return sendMessage({
                command: 'delete',
                url: newUrl
            }).then(resp => {
                return {
                    url: newUrl,
                    method: method,
                    data: {}
                };
            });
        }

        // 处理data为空时，不需要拼接&到url上
        let queryStr = $.param(data);
        if (queryStr) {
            if (newUrl.indexOf('?') !== -1) {
                newUrl += '&' + queryStr;
            } else {
                newUrl += '?' + queryStr;
            }
        }

        data = {};
    }

    return Promise.resolve({
        url: newUrl,
        method,
        data
    });
}

let handleResult = (option) => {
    let resp = option.resp;
    let reject = option.reject;
    let resolve = option.resolve;
    let reqUrl = option.reqUrl;

    // 兼容第三方接口
    if (typeof resp.code === 'undefined') {
        resolve(resp);
    } else if (resp.code === 0) {
        resolve(resp.data);
    } else {
      // 把异常状态的请求url打印出来
        console.error('fetch [%s] fail:', reqUrl);
        reject(resp);

        if (resp.code === 403) {
            let fromUrl = window.location.href;
            window.location.replace(loginPageUrl + `&url=${fromUrl}`);
        } else if (resp.code === 401) {
            alert('您未开通此权限，若需开通，请联系管理员。\n');
            reject(resp);
        }
    }
};

let handleXhrFields = (options) => {
    return {
        withCredentials: true
    };
};

export function fetch(api, data = {}, rawMethod = 'GET') {
    return handleParams(api, data, rawMethod).then(options => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: options.url,
                type: options.method,
                data: options.data,
                crossDomain: true,
                xhrFields: handleXhrFields(options),
                success(resp, status) {
                    handleResult({
                        status: status,
                        resp: resp,
                        resolve: resolve,
                        reject: reject,
                        reqUrl: options.url
                    });
                },
                error(resp) {
                    reject(resp);
                    console.error('fetch [%s] [%s] fail: [%s]', options.url, options.method, resp.msg);
                }
            });
        });
    });
}
