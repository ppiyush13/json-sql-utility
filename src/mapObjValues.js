export const composeObjValueMapper = fn => (obj, keys) => {
    const objClone = {...obj};
    const iterableKeys = keys || Object.keys(obj);
    return iterableKeys.reduce((acc, key) => {
        acc[key] = fn(obj[key]);

        return acc;
    }, objClone);
};

export default (obj, fn, keys) => {
    const mapper = composeObjValueMapper(fn);
    return mapper(obj, keys);
};