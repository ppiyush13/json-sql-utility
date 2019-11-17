import buildWhereClause from '../buildWhereClause';

describe('testing buildWhereClause module', () => {
    it.each([
        [
            [
                {
                    operator: 'equal',
                    field: 'A',
                    value: '5'
                },
                {
                    operator: '=',
                    field: 'B',
                    value: ['5', '10']
                }
            ],
            `
                A = '5' AND B IN ('5', '10')
            `,
        ],
        [
            [
                {
                    operator: 'notequal',
                    field: 'A',
                    value: '5'
                },
                {
                    operator: '!=',
                    field: 'B',
                    value: ['5', 13]
                }
            ],
            `
                A != '5' AND B NOT IN ('5', 13)
            `,
        ],
        [
            [
                {
                    operator: 'is',
                    field: 'A',
                    value: null
                },
                {
                    operator: 'is',
                    field: 'B',
                }
            ],
            `
                A IS null AND B IS null
            `,
        ],
        [
            [
                {
                    operator: '=',
                    field: 'A',
                    value: '5'
                },
                {
                    operator: '=',
                    field: 'B',
                    value: [13, '15']
                },
                {
                    operator: '=',
                    field: 'C',
                    value: null
                },
                {
                    operator: 'like',
                    field: 'X',
                    value: '% Profit %'
                },
                {
                    operator: '!=',
                    field: 'D',
                    value: 6
                },
                {
                    operator: '!=',
                    field: 'E',
                    value: [6, 'Foo']
                },
                {
                    operator: '!=',
                    field: 'F',
                    value: null
                },
                {
                    operator: 'notLike',
                    field: 'Y',
                    value: '_Under'
                },
            ],
            `
                A = '5' AND
                B IN (13, '15') AND
                C IS null AND
                X LIKE '% Profit %' AND
                D != 6 AND
                E NOT IN (6, 'Foo') AND
                F IS NOT null AND
                Y NOT LIKE '_Under'
            `,
        ],
        [
            [
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
            `
                NAME = 'Piyush' AND 
                ROLL = 13 AND 
                (
                    A = 5 OR A = 10
                )
            `
        ],
        [
            {
                operator: 'or',
                conditions: [
                    {
                        operator: '=',
                        field: 'a',
                        value: ['1', '2'],
                    },
                    {
                        operator: '=',
                        field: 'a',
                        value: null,
                    },
                    {
                        operator: 'and',
                        conditions: [
                            {
                                operator: 'noteq',
                                field: 'b'
                            },
                            {
                                operator: 'noteq',
                                field: 'c',
                                value: ['1', '2']
                            },
                            {
                                operator: 'and',
                                conditions: [
                                    {
                                        operator: 'notBetween',
                                        field: 'b',
                                        start: 15,
                                        end: 19,
                                    },
                                    {
                                        operator: 'BETWEEN',
                                        field: 'c',
                                        start: '1', 
                                        end: '2',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            `
                a IN ('1', '2')  OR 
                a IS null OR
                (
                    b IS NOT null AND
                    c NOT IN ('1', '2') AND
                    (
                        b NOT BETWEEN 15 AND 19 AND
                        c BETWEEN '1' AND '2'
                    )
                )
            `
        ],
        [
            [
                {
                    operator: 'gte',
                    field: 'age',
                    value: 18
                },
                {
                    operator: 'lessThanOrEqualTo',
                    field: 'age',
                    value: 35
                },
                {
                    operator: 'and',
                    conditions: [
                        {
                            operator: 'greaterThan',
                            field: 'A',
                            value: 10
                        },
                        {
                            operator: 'lessThan',
                            field: 'A',
                            value: 90,
                        }
                    ]
                }
            ],
            `
                age >= 18 AND 
                age <= 35 AND 
                (
                    A > 10 AND
                    A < 90
                )
            `
        ],
        [
            [
                {
                    operator: 'dateBetween',
                    field: 'birth',
                    value: {
                        start: new Date(1975, 0, 1),
                        end: new Date(1999, 11, 31),
                    }
                }
            ],
            `
                birth BETWEEN '1975-01-01' AND '1999-12-31'
            `
        ],
    ])('testing with each utility', (received, expected) => {
        expect(buildWhereClause.build(received)).toBeSimilarWith(expected);
    });

    it('negative testing blocks', () => {
        const configObj = {
            operator: 'and',
        };
        expect(() => buildWhereClause.build(configObj))
            .toThrow('\'conditions\' is mandatory for operator \'and\' !');
    });

    it.each([
        [
            {
                field: 'A',
                start: '2',
                end: '5'
            },
            `
                A BETWEEN '2' AND '5' 
            `
        ],
        [
            {
                field: 'A',
                start: 2,
                end: 5
            },
            `
                A BETWEEN 2 AND 5 
            `
        ],
        [
            {
                field: 'A',
                value: [2, 5],
            },
            `
                A BETWEEN 2 AND 5 
            `
        ],
        [
            {
                field: 'A',
                value: {
                    start: 2,
                    end: 5,
                },
            },
            `
                A BETWEEN 2 AND 5 
            `
        ]
    ])('testing between module', (received, expected) => {
        expect(buildWhereClause.between(received)).toBeSimilarWith(expected);
    });

    it.each([
        [
            {
                field: 'A',
                start: new Date(2019, 10, 15),
                end: new Date(2019, 10, 30)
            },
            `
                A BETWEEN '2019-11-15' AND '2019-11-30' 
            `
        ],
        [
            {
                field: 'A',
                value: {
                    start: new Date(2019, 10, 15),
                    end: new Date(2019, 10, 30),
                }
            },
            `
                A BETWEEN '2019-11-15' AND '2019-11-30' 
            `
        ],
        
        [
            {
                field: 'A',
                value: [ new Date(2019, 10, 15), new Date(2019, 10, 30) ]
            },
            `
                A BETWEEN '2019-11-15' AND '2019-11-30' 
            `
        ],
        [
            {
                field: 'A',
                start: new Date(2019, 10, 15),
                end: new Date(2019, 10, 30),
                format: 'MM-yyyy-dd',
            },
            `
                A BETWEEN '11-2019-15' AND '11-2019-30' 
            `
        ],
        [
            {
                field: 'A',
                format: 'MM-yyyy-dd',
                value: {
                    start: new Date(2019, 10, 15),
                    end: new Date(2019, 10, 30),
                }
            },
            `
                A BETWEEN '11-2019-15' AND '11-2019-30' 
            `
        ],
        
        [
            {
                field: 'A',
                format: 'MM-yyyy-dd',
                value: [ new Date(2019, 10, 15), new Date(2019, 10, 30) ]
            },
            `
                A BETWEEN '11-2019-15' AND '11-2019-30' 
            `
        ],
    ])('Testing DateBetween operator', (received, expected) => {
        expect(buildWhereClause.dateBetween(received)).toBeSimilarWith(expected);
    });
});
