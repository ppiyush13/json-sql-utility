import invertedMap from './invertMap'

const toLowerCase = item => (item + '').toLowerCase(item);

export default (obj, fn_aliasMap, isCaseInsensitive) => {
    const alias_fnMap = invertedMap(fn_aliasMap, {
        keyMapper: isCaseInsensitive && toLowerCase,
    });
    
    const aliasProxy = new Proxy(obj, {
        get: (target, propKey) => {
            const key = isCaseInsensitive ? toLowerCase(propKey) : propKey;
            const fn = alias_fnMap[key];
            if(fn) {
                return (...args) => {
                    return obj[fn].apply(aliasProxy, args);
                }
            }
            else {
                return obj[propKey];
            }
        },
    });

    return aliasProxy;
};