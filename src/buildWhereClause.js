import aarify from 'arrify';
import alias from './alias';
import quotifyValue from './quotifyValue';
import functionAliasMap from './funtionAliasMap'
import mapObjValues from './mapObjValues';
import templates from './template/templates'
import templateUtil from './template/util';
import {arrayJoinMap} from './arrayUtils';
import {wrapInSpace, wrapeInSpacedBrackets} from './stringUtils';

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

    between(config, isNot) {
        const transformedConfigs = mapObjValues(config, quotifyValue, ['before', 'after']);
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

    notlike(config) {
        return this.like(config, true);
    },

};

export default alias(builder, functionAliasMap, true);