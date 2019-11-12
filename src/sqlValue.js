import arrify from 'arrify';
import quotifyValue from './quotifyValue';

export default (value) => {
    const valueList = arrify(value);
    return valueList.map(valueItem => quotifyValue(valueItem));
}