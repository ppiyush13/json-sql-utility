import jsonTemplating from '../jsonTemplating';

describe('testing jsonTemplating module', () => {
    it.each([
        [
            [
                {

                },
                {

                },
            ],
            '',
            ''
        ],
        [
            {
                condition: true,
                joinChar: ' ',
                tpl: [
                    {
                        tpl: 'Start'
                    },
                    {
                        condition: false,
                        tpl: 'Wont appear'
                    },
                    {
                        tpl: 'End'
                    }
                ]
            },
            ' ',
            "Start End"
        ],
        [
            {
                tpl: [
                    {
                        tpl: 'Start'
                    },
                    {
                        condition: false,
                        tpl: 'Wont appear'
                    },
                    {
                        tpl: 'End'
                    }
                ]
            },
            '',
            "StartEnd"
        ],
        [
            [
                {
                    tpl: 'select',
                },
                {
                    tpl: '*',
                },
                {
                    tpl: 'from',
                }
            ],
            ' ',
            'select * from'
        ],
        [
            {
                tpl: 'token',
                joinChar: ' ',
            },
            '',
            'token'
        ],
        [
            {
                tpl: 'token',
                joinChar: ' '
            },
            ' ',
            'token'
        ],
        [
            [
                {
                    tpl: 'Piyush',
                    joinChar: ' ',
                },
                {
                    tpl: 'Lodaya',
                    joinChar: ' ',
                }
            ],
            ' ',
            'Piyush Lodaya'
        ],
        [
            [
                'Simple',
                'String',
                'Template',
                'Engine'
            ],
            ' ',
            'Simple String Template Engine'
        ],
        [
            {
                joinChar: '\n',
                tpl: [
                    'List of Stars:',
                    {
                        joinChar: ', ',
                        tpl: [
                            'Mercury',
                            'Venus',
                            'Earth',
                            '..'
                        ]
                    },
                    {
                        condition: false,
                        tpl: 'This wont make to the output',
                    },
                    null,
                    'Some kebab-cased strings:',
                    {
                        joinChar: '-',
                        tpl: [
                            '',
                            'webkit',
                            'transform'
                        ]
                    }
                ],
            },
            '',
            'List of Stars:\n' +
            'Mercury, Venus, Earth, ..\n' +
            'Some kebab-cased strings:\n' +
            '-webkit-transform'
        ],
        [
            {
                joinChar: ',',
                tpl: [
                    'Start',
                    null,
                    'End'
                ]
            },
            '',
            'Start,End'
        ],
        [
            {
                tpl: {
                    tpl: 'Some String',
                }
            },
            '',
            'Some String'
        ],
        [
            {
                control: 'if',
                condition: true,
                tpl: [
                    {
                        condition: true,
                        tpl: 'Add this'
                    },
                    {
                        tpl: 'Else add this'
                    }
                ]
            },
            '',
            'Add this',
        ],
        [
            {
                control: 'if',
                tpl: {
                    tpl: 'Still supported, but not advised',
                }
            },
            '',
            'Still supported, but not advised'
        ],
        [
            {
                control: 'if',
                tpl: [
                    {
                        condition: false,
                        tpl: 'Wont be included !',
                    },
                    null,
                    'This is included',
                    {
                        condition: true,
                        tpl: 'Wont be traversed at all !'
                    }
                ]
            },
            '',
            'This is included'
        ],
        [
            {
                control: 'if',
                tpl: [
                    {
                        condition: false,
                        tpl: 'Wont be included !',
                    },
                    {
                        condition: true,
                        tpl: {
                            control: 'if',
                            tpl: [
                                {
                                    condition: false,
                                    tpl: 'Even I wont be included'
                                },
                                {
                                    joinChar: '\n',
                                    tpl: [
                                        'Example of nested if !',
                                        ' Also if condition not provided, it is assumed as true'
                                    ]
                                }
                            ]
                        }
                    }
                ]
            },
            '',
            'Example of nested if !\n' + 
            ' Also if condition not provided, it is assumed as true'
        ],
        [
            {
                joinChar: '-',
                control: 'if',
                tpl: [

                ]
            },
            '',
            ''
        ],
        [
            {
                joinChar: '-',
                control: 'if',
                tpl: [
                    {
                        condition: false,
                        tpl: 'This wont be included'
                    },
                    {
                        condition: false,
                        tpl: 'Neither will this'
                    },
                ],
            },
            '',
            ''
        ],
    ])('testing jsonTemplating positive scenarios', (rec, joinChar, exp) => {
        expect(jsonTemplating(rec, joinChar)).toEqual(exp);
    });
});