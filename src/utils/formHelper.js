import _ from 'lodash';

export const createFormDataFormatter = (formatter) => (rawFormData) => {
    let formdata = _.cloneDeep(rawFormData);

    formatter(formdata);

    for (var field in formdata) {
        if (formdata.hasOwnProperty(field)) {
            if (Object.prototype.toString.call(formdata[field]) === '[object Array]') {
                if (!formdata[field].length) {
                    delete formdata[field];
                } else {
                    formdata[field] = formdata[field].join();
                }
            }
            if (formdata[field] === undefined || formdata[field] === '') {
                delete formdata[field];
            }
            if (typeof formdata[field] === 'object') {
                formdata[field] = JSON.stringify(formdata[field]);
            }

            if (typeof formdata[field] === 'number' && isNaN(formdata[field])) {
                formdata[field] = void (0);
            }
        }
    }
    return formdata;
};

export const resetWith = (target, source) => {
    for (var variable in target) {
        if (target.hasOwnProperty(variable)) {
            target[variable] = source[variable];
        }
    }
};

export const handleQueryFields = (query) => {
    let ret = {};

    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            let val = query[key];
            if (typeof val === 'boolean' || val) {
                ret[key] = val;
            }
        }
    }

    return ret;
};

const ccReg = /([\u4e00-\u9fa5]+)/g;

export function getTextLen(text) {
    if (!text) {
        return 0;
    }

    let len = text.length;
    let ccLen = (text.match(ccReg) || []).join('').length;

    return len - ccLen + ccLen * 2;
}
