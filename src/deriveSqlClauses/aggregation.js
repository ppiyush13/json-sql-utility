import jsonTemplating from '../jsonTemplating';
import { wrapInBrackets } from '../stringUtils';

export default function(aggregate) {
    return aggregate.map(({fn, args, alias, clause}) => {
        return jsonTemplating([
            {
                control: 'if',
                tpl: [
                    {
                        condition: clause,
                        tpl: clause,
                    },
                    {
                        condition: fn,
                        tpl: [
                            {
                                tpl: fn,
                            },
                            {
                                tpl: wrapInBrackets(args),
                            }
                        ]
                    },
                ]
            },
            {
                condition: alias,
                tpl: `AS ${alias}`,
            },
        ], ' ');
    });
}