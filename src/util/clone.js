function clone(obj) {
    let res = Array.isArray(obj) ? [] : {};
    if (typeof obj !== 'object') {
        return obj;
    }
    for (const key in obj) {
        res[key] = typeof obj[key] === 'object' ? clone(obj[key]) : obj[key];
    }
    return res;
}

module.exports = clone;
