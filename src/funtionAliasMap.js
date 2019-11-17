import arrify from 'arrify'

const aliasConfigs = {
    equal: {
        alias: ['in', 'eq', 'is'],
        operator: '=',
        generateNotEquivalent: true,
        notOperator: '<>',
    },
    between: {
        alias: 'range',
        generateNotEquivalent: true,
    },
    dateBetween: {
        alias: 'dateRange',
        generateNotEquivalent: true,
    },
    like: {
        // no alias and no operator
        generateNotEquivalent: true,
    },
    greaterThan: {
        alias: ['gt', 'greater'],
        operator: '>'
    },
    greaterThanEqual: {
        alias: ['gte', 'greaterThanOrEqualTo'],
        operator: '>='
    },
    lessThan: {
        alias: ['lesserThan', 'lt', 'lesser'],
        operator: '<'
    },
    lessThanEqual: {
        alias: ['lesserThanEqual', 'lte', 'lesserThanOrEqualTo', 'lessThanOrEqualTo'],
        operator: '<='
    },
    block: {
        alias: ['or', 'and'],
    },
};

const prefixNotToken = (item, notToken, isNot) => {
    const prefix = isNot ? notToken : '';
    return `${prefix}${item}`;
};

const generateAliasList = ({alias, key, isNot, operator}) => {
    let aliasList = arrify(alias).map(item => prefixNotToken(item, 'not', isNot));

    // push key
    aliasList.push(prefixNotToken(key, 'not', isNot));

    // push operator
    if(operator) {
        aliasList.push(prefixNotToken(operator, '!', isNot));
    }
    return aliasList;
};

export default Object.keys(aliasConfigs).reduce((acc, key) => {
    const {alias, operator, generateNotEquivalent, notOperator} = aliasConfigs[key];
    const positiveKey = prefixNotToken(key, 'not', false);
    acc[positiveKey] = generateAliasList({alias, key, operator, isNot: false});

    if(generateNotEquivalent) {
        const negativeKey = prefixNotToken(key, 'not', true);
        const notList = generateAliasList({alias, key, operator, isNot: true});

        if(notOperator) {
            notList.push(notOperator);
        }
        acc[negativeKey] = notList;
    }

    return acc;
}, {});
