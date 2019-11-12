import aarify from 'arrify';
import {arrayJoinMap} from './arrayUtils';
import isObject from 'isobject';
import isFunction from 'is-function';

const jsonTemplate = {
    configify(tplConfig) {
        if(isObject(tplConfig)) {
            return tplConfig;
        }
        else {
            return {
                tpl: tplConfig,
            }
        }
    },

    resolveTpl() {
        return isFunction(tpl) ? tpl() : tpl;
    },

    isNotValidTplConfig(tplConfig) {
        return tplConfig == null;
    },

    isTplParseable(tpl) {
        return Array.isArray(tpl) || isObject(tpl);
    },

    isConditionTruty(tplConfig) {
        if(isObject(tplConfig)) {
            const conditionDefined = Object.prototype.hasOwnProperty.call(tplConfig, 'condition');
            return conditionDefined ? tplConfig.condition : true;
        }
        else {
            throw 'Config is not valid. Please report this as a bug.'
        }
    },

    parse(tpl, joinChar = '') {
        return arrayJoinMap(
            aarify(tpl),
            tplConfig => {
                // return if config is null or undefined
                if(this.isNotValidTplConfig(tplConfig)) return null;

                // convert to obj if config is string
                const tplConfigObj = this.configify(tplConfig);

                const {tpl, joinChar, control} = tplConfigObj;

                // check if tpl could be included in output
                if(this.isConditionTruty(tplConfigObj)) {
                    if(control) {
                        // if tpl is control, execute control flow
                        const passingTpl = callMethodOf(this, control.toLowerCase(), [tpl], () => {
                            throw `Provided control '${control}' is not valid`;
                        });

                        // parse the passing tpl 
                        if(passingTpl)
                            return this.parse(passingTpl, joinChar);
                    }
                    else {
                        return this.isTplParseable(tpl) ? this.parse(tpl, joinChar) : tpl;
                    }
                }
            },
            joinChar,
            true
        );
    },

    if(tpl) {
        return aarify(tpl).find(tplConfig => {
            if(this.isNotValidTplConfig(tplConfig)) return null;
            return this.isConditionTruty(this.configify(tplConfig));
        });
    }
}

const rebind = (obj, method) => {
    return obj[method].bind(obj);
}

const callMethodOf = (obj, methodName, args, fallBackFn) => {
    const method = obj[methodName];
    if(method) {
        return method.apply(obj, args)
    }
    else {
        if(fallBackFn)
            return fallBackFn();
    }
}

const returnableLoop = (array, cb) => {
    const next = function() {

    };
    for(let i = 0; i < array.length; i++) {
        const item = array[i];
        cb(next, item, i, array);
    }
};

export default rebind(jsonTemplate, 'parse');