# json-sql-utility

[![module verion and npm link][npm]][npm-url]
[![bundlephobia minified size][size-min]][bundlephobia-url]
[![bundlephobia minizipped size][size-minzip]][bundlephobia-url]

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
        },
        {
            operator: 'dateBetween',
            field: 'BIRTH',
            value: {
                start: new Date(1975, 0, 1),
                end: new Date(1999, 11, 31),
            }
        },
    ],
    groupBy: ['A', 'B', 'C'],
    orderBy: ['A'],
    misc: [
        "EXTERNAL NAME 'TestFuncs$MyMath.pow'"
    ],
});

console.log(query);

/*
Will output:

SELECT A, B, count(D) AS CNT FROM STUDENTS
WHERE NAME = 'Piyush' AND ROLL = 13 AND (A = 5 OR A = 10) AND 
BIRTH BETWEEN '1975-01-01' AND '1999-12-31'
GROUP BY A, B, C
ORDER BY A
EXTERNAL NAME 'TestFuncs$MyMath.pow'

*/
```


[npm]: https://img.shields.io/npm/v/json-sql-utility.svg
[npm-url]: https://www.npmjs.com/package/json-sql-utility
[size-min]: https://img.shields.io/bundlephobia/min/json-sql-utility
[size-minzip]: https://img.shields.io/bundlephobia/minzip/json-sql-utility
[bundlephobia-url]: https://bundlephobia.com/result?p=json-sql-utility
