"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToLocale = convertToLocale;
function convertToLocale(data, i18n) {
    if (Array.isArray(data)) {
        return data.map(item => convertToLocale(item, i18n));
    }
    if (data &&
        typeof data === 'object') {
        const newObj = {};
        for (const key in data) {
            if (key === 'message' &&
                typeof data[key] === 'string') {
                newObj[key] =
                    i18n.t(data[key]);
            }
            else {
                newObj[key] =
                    convertToLocale(data[key], i18n);
            }
        }
        return newObj;
    }
    return data;
}
//# sourceMappingURL=locale.helper.js.map