import functionAliasMap from '../funtionAliasMap'

describe('testing functionAliasMap module', () => {
    it('should return alias map', () => {
        expect(functionAliasMap).toEqual({
            equal: [ 'in', 'eq', 'is', 'equal', '=' ],
            notequal: [ 'notin', 'noteq', 'notis', 'notequal', '!=', '<>' ],
            between: [ 'range', 'between' ],
            dateBetween: ['dateRange', 'dateBetween'],
            notbetween: [ 'notrange', 'notbetween' ],
            like: ['like'],
            notlike: ['notlike'],
            greaterThan: [ 'gt', 'greater', 'greaterThan', '>' ],
            greaterThanEqual: [ 'gte', 'greaterThanOrEqualTo', 'greaterThanEqual', '>=' ],
            lessThan: [ 'lesserThan', 'lt', 'lesser', 'lessThan', '<' ],
            lessThanEqual: ['lesserThanEqual', 'lte', 'lesserThanOrEqualTo', 'lessThanOrEqualTo', 'lessThanEqual', '<='],
            block: ['or', 'and', 'block']
        });
    });
});