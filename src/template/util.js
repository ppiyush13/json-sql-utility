import templates from './templates';
import sqlValue from '../sqlValue';

export default {
    applyTemplate(template, args, isNot) {
        const notOperator = isNot ? 'NOT' : '';
        return template({
            ...args,
            notOperator,
        });
    },

    composeOperatorForTemplate(template, operator) {
        return ({field, value}, isNot) => this.applyTemplate(template, {
            value: sqlValue(value),
            field,
            operator,
        }, isNot);
    },

    composeRelationalOperator(operator) {
        return this.composeOperatorForTemplate(templates.relational, operator);
    },

}