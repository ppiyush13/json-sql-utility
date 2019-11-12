import identityFn from 'identity-function';
import arrify from 'arrify';
import isFunction from 'is-function';
import {composeObjValueMapper} from './mapObjValues';

const mapper = composeObjValueMapper(fn => isFunction(fn) ? fn : identityFn);

export default (obj, configs = {}) => {
    const {itemMapper, keyMapper} = mapper(configs, ['itemMapper', 'keyMapper']);

    return Object.keys(obj).reduce((acc, cur) => {
        const list = arrify(obj[cur]);

        list.forEach(item => {
            const mappedItem = itemMapper(cur);
            const mappedKey = keyMapper(item);
            acc[mappedKey] = mappedItem;
        });

        return acc;
    }, {});
};
