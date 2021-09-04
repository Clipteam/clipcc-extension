const clone = require('./clone');

function compareParsedVersion(ver1, ver2) {
    const len = ver1.length > ver2.length ? ver1.length : ver2.length;
    for (let i = 0; i < len; ++i) {
        const v1 = i < ver1.length ? Number.isNaN(Number(ver1[i]) ? ver1[i] : Number(ver1[i])) : 0;
        const v2 = i < ver2.length ? Number.isNaN(Number(ver2[i]) ? ver2[i] : Number(ver2[i])) : 0;
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
    }
    return 0;
}

function matchVersion(ver, reg) {
    if (reg[0] === '^') {
        const minVer = reg.substr(1).split('.');
        const maxVer = clone(minVer);
        maxVer[0] = Number(maxVer[0]) + 1;
        return compareParsedVersion(ver.split('.'), maxVer) < 0 && compareParsedVersion(ver.split('.'), minVer) >= 0;
    }
    else if (reg[0] === '~') {
        const minVer = reg.substr(1).split('.');
        const maxVer = clone(minVer);
        maxVer[1] = Number(maxVer[1]) + 1;
        return compareParsedVersion(ver.split('.'), maxVer) < 0 && compareParsedVersion(ver.split('.'), minVer) >= 0;
    }
    else if (reg.includes('*')) {
        return RegExp(reg.replace(/\*/g, '\\d*')).test(ver);
    }
    else {
        return compareParsedVersion(ver.split('.'), reg.split('.')) === 0;
    }
}

module.exports = {
    compareParsedVersion,
    matchVersion
};
