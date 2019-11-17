import functionAliasMap from '../funtionAliasMap'

describe('testing functionAliasMap module', () => {
    it('should return alias map', () => {
        console.log(functionAliasMap)
        expect(functionAliasMap).toEqual({
            equal: [ 'in', 'eq', 'is', 'equal', '=' ],
            notequal: [ 'notin', 'noteq', 'notis', 'notequal', '!=', '<>' ],
            between: [ 'range', 'between' ],
            notbetween: [ 'notrange', 'notbetween' ],
            dateBetween: ['dateRange', 'dateBetween'],
            notdateBetween: [ 'notdateRange', 'notdateBetween' ],
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