import arrify from 'arrify';
import buildWhereClause from './buildWhereClause';
import {composeObjValueMapper} from './mapObjValues';
import {addToArray, arrayJoin} from './arrayUtils';
import jsonTemplating from './jsonTemplating';
import {deriveProjection, deriveGroupBy, deriveOrderBy, deriveLimit} from './deriveSqlClauses'; 

const convertObjValues2List = composeObjValueMapper(arrify);

export const select = function select(selectConfigs) {
    const arrifiedSelectConfigs = convertObjValues2List(selectConfigs, ['groupBy', 'aggregate', 'fields', 'orderBy']);
    const {fields, aggregate, from, where, groupBy, having, orderBy, limit, misc} = arrifiedSelectConfigs;

    const projectionFields = deriveProjection({fields, groupBy, aggregate});
    const whereClause = buildWhereClause.build(where);
    const havingClause = buildWhereClause.build(having);
    const groupByClause = deriveGroupBy(groupBy);
    const orderByClause = deriveOrderBy(orderBy);
    const limitClause = deriveLimit(limit);

    return jsonTemplating([
        {
            tpl: `SELECT ${projectionFields}`
        },
        {
            tpl: `FROM ${from}`, 
        },
        {
            condition: whereClause,
            tpl: `WHERE ${whereClause}`
        },
        {
            condition: groupByClause,
            tpl: `GROUP BY ${groupByClause}`
        },
        {
            condition: havingClause,
            tpl: `HAVING ${havingClause}`
        },
        {
            condition: orderByClause,
            tpl: `ORDER BY ${orderByClause}`,
        },
        {
            condition: limitClause,
            tpl: `LIMIT ${limitClause}`,
        },
        {
            condition: misc,
            tpl: misc,
        },
    ], ' ');
};
