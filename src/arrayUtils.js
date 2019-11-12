
export const arrayJoin = (array, separator) => {
    return array
        .filter(item => item != undefined)
        .join(separator);
}

export const arrayJoinMap = (array, fn, separator, useArrayJoin) => {
    const mappedArray = array.map(fn);
    return useArrayJoin 
        ? arrayJoin(mappedArray, separator)
        : mappedArray.join(separator);
}

export const addToArray = (array, appendArray) => Array.prototype.push.apply(array, appendArray);