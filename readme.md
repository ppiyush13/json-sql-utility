# json-sql-utility

This module is useful for buidling SQL queries from JSON objects.
Currently only SELECT query is supported.

## Install
```javascript
yarn add json-sql-utility
or
npm i json-sql-utility
```

## Usage
Simple example

```javascript
import { select } from "json-sql-utility"

const query = select({
    fields: ['A', 'B'],
    aggregate: [ 
        {
            fn: 'count',
            args: 'D',
            alias: 'CNT'
        }
    ],
    from: 'STUDENTS',
    where: [
        {
            operator: 'equal',
            field: 'NAME',
            value: 'Piyush'
        },
        {
            operator: '=',
            field: 'ROLL',
            value: [13],
        },
        {
            operator: 'OR',
            conditions: [
                {
                    operator: 'equal',
                    field: 'A',
                    value: 5,
                },
                {
                    operator: 'equal',
                    field: 'A',
                    value: 10,
                }
            ]
        }
    ],
    groupBy: ['A', 'B', 'C'],
    orderBy: ['A'],
});

console.log(query);

/*
Will output:

SELECT A, B, count(D) AS CNT FROM STUDENTS
WHERE NAME = "Piyush" AND ROLL = 13 AND (A = 5 OR A = 10)
GROUP BY A, B, C
ORDER BY A

*/
```