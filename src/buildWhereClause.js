import aarify from 'arrify';
import alias from './alias';
import quotifyValue from './quotifyValue';
import functionAliasMap from './funtionAliasMap'
import mapObjValues from './mapObjValues';
import templates from './template/templates'
import templateUtil from './template/util';
import {arrayJoinMap} from './arrayUtils';
import {wrapInSpace, wrapeInSpacedBrackets} from './stringUtils';
import dateValue from './dateValue';

const builder = {
    build(where) {
        if(where) {
            if(Array.isArray(where)) {
                return this.block({
                    conditions: where, 
                    operator: 'AND',
                    avoidWrap: true
                });
            }
            else {
                return this.block({
                    ...where,
                    avoidWrap: true,
                });
            }
        }
        else {
            return '';
        }
    },

    block({ conditions, operator, avoidWrap}) {
        if(conditions) {
            const joinedCondition = arrayJoinMap(
                aarify(conditions),
                condition => {
                    const fn = condition.operator.toLowerCase();
                    return this[fn](condition);
                },
                wrapInSpace(operator.toUpperCase()),
            );
             
            return avoidWrap
                ? joinedCondition
                : wrapeInSpacedBrackets(joinedCondition);
        }
        else {
            throw `'conditions' is mandatory for operator '${operator}' !`;
        }
    },

    transformBetweenConfig(config) {
        const {start, end, value} = config;
        if(start && end) {
            return config;
        }
        const createBetweenCfg = (start, end) => {
            return {
                ...config,
                start, end,
            };
        }
        if(value) {
            if(value.start && value.end) {
                return createBetweenCfg(value.start, value.end);
            }
            if(Array.isArray(value) && value.length === 2 && !start && !end ) {
                return createBetweenCfg(value[0], value[1]);
            }
        }
        return config;
    },

    between(config, isNot) {
        const transformedConfigs = mapObjValues(this.transformBetweenConfig(config), quotifyValue, ['start', 'end']);
        return templateUtil.applyTemplate(templates.between, transformedConfigs, isNot);
    },

    dateBetween(config, isNot) {
        const toDate = dateValue(config.format || 'yyyy-MM-dd');
        const mapFn = item => quotifyValue(toDate(item));
        const transformedConfigs = mapObjValues(this.transformBetweenConfig(config), mapFn, ['start', 'end']);
        return templateUtil.applyTemplate(templates.between, transformedConfigs, isNot);
    },

    equal: templateUtil.composeOperatorForTemplate(templates.equal.bind(templates)),
    like: templateUtil.composeOperatorForTemplate(templates.like),
    greaterThan: templateUtil.composeRelationalOperator('>'),
    greaterThanEqual: templateUtil.composeRelationalOperator('>='),
    lessThan: templateUtil.composeRelationalOperator('<'),
    lessThanEqual: templateUtil.composeRelationalOperator('<='),

    notequal(config) {
        return this.equal(config, true);
    },

    notbetween(config) {
        return this.between(config, true);
    },

    notdateBetween(config) {
        return this.dateBetween(config, true);
    },

    notlike(config) {
        return this.like(config, true);
    },

};

export default alias(builder, functionAliasMap, true);