export default {
    between({field, start, end, notOperator}) {
        return `${field} ${notOperator} BETWEEN ( ${start} AND ${end} )`;
    },

    is({field, value, notOperator}) {
        return `${field} IS ${notOperator} ${value}`;
    },

    in({field, value, notOperator}) {
        return `${field} ${notOperator} IN (${value})`;
    },

    eq({field, value, notOperator}) {
        const operator = notOperator ? '!=' : '=';
        return `${field} ${operator} ${value}`;
    },

    like({field, value, notOperator}) {
        return `${field} ${notOperator} LIKE ${value}`;
    },

    relational({field, value, operator, notOperator}) {
        return `${field} ${notOperator} ${operator} ${value}`;
    },

    equal({field, value, notOperator}) {
        if(value.length === 0) {
            return this.is({field, value: null, notOperator});
        }
        else if(value.length === 1) {
            return this.eq({field, value, notOperator});
        }
        else {
            return this.in({field, value, notOperator});
        }
    },
}