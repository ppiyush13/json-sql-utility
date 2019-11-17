import json2sql, { select } from '../';

describe('testing json2sql module', () => {
    it.each([
        [
            {
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
            },
            `
                SELECT A, B, count(D) AS CNT FROM STUDENTS
                WHERE NAME = 'Piyush' AND ROLL = 13 AND (A = 5 OR A = 10)
                GROUP BY A, B, C
                ORDER BY A
            `,
        ],
        [
            {
                aggregate: [
                    {
                        clause: 'uniq(name)',
                        alias: 'UniquesNames'
                    }
                ],
                from : 'Students',
                where: [
                    {
                        operator: '=',
                        field: 'dept',
                        value: ['Eng', 'HM']
                    }
                ],
                groupBy: ['dept', 'loc'],
                having: [
                    {
                        operator: 'notLike',
                        field: 'uniq(name)',
                        value: '%Piyush%'
                    }
                ],
                orderBy: [
                    {
                        field: 'name',
                        dir: 'desc'
                    }
                ]
            },
            `
                SELECT dept, loc, uniq(name) AS UniquesNames
                FROM Students
                WHERE dept IN ('Eng', 'HM')
                GROUP BY dept, loc
                HAVING uniq(name) NOT LIKE '%Piyush%'
                ORDER BY name desc
            `
        ],
        [
            {
                from :'admin',
                fields: '*',
                limit: 100
            },
            `
                SELECT * FROM admin
                LIMIT 100
            `
        ],
        [
            {
                from: 'imaginary',
                fields: '*',
                misc: [
                    'some random text',
                    'at end',
                ]
            },
            `
                SELECT * FROM imaginary
                some random textat end
            `,
        ],
        [
            {
                from: 'imaginary',
                fields: '*',
                misc: 'some random text'
            },
            `
                SELECT * FROM imaginary
                some random text
            `,
        ],
        [
            {
                from: 'imaginary',
                fields: '*',
                misc: {
                    joinChar: ' ',
                    tpl: [
                        'some random text',
                        'at end',
                    ]
                }
            },
            `
                SELECT * FROM imaginary
                some random text at end
            `,
        ],
        
        
    ])('testing using it.each', (received, expected) => {
        expect(select(received)).toBeSimilarWith(expected);
    });
});
