import isNumber from "is-number";
import isString from 'is-string';
import isObject from 'isobject';

const isValid = item => isNumber(item) || isString(item);

const convertLimitToObjIfPrimitive = limit => {
    if(isValid(limit)) {
        return {
            count: limit,
        };
    }
    return isObject(limit) ? limit : {};
}

export default function limit(limit) {
    if(limit == undefined) {
        return '';
    }
    else {
        const {offset, count} = convertLimitToObjIfPrimitive(limit);
        const isOffsetValid = isValid(offset);
        const isCountValid = isValid(count);
        
        if(isCountValid && isOffsetValid) {
            return `${offset}, ${count}`;
        }
        else if(isCountValid) {
            return `${count}`;
        }
        else if(isOffsetValid) {
            throw 'Offset without count is not valid !';
        }
        else {
            throw 'Please specify limit or offset !';
        }
    }
}
