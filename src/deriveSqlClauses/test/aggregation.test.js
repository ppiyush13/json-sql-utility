import deriveAggregation from '../aggregation';

describe('testing aggregation output', () => {
    it('test all scenarios together', () => {
        const out = deriveAggregation([
            {
                fn: 'count',
                args: '*',
                alias: 'CNT'
            },
            {
                fn: 'sum',
            },
            {
                clause: 'count(DISTINCT name)',
            },
            {
                clause : 'DISTINCT name',
            },
            {
                clause : 'DISTINCT name',
                alias: 'DistinctName'
            }
        ]);

        expect(out).toEqual([
            'count(*) AS CNT',
            'sum()',
            'count(DISTINCT name)',
            'DISTINCT name',
            'DISTINCT name AS DistinctName',
        ]);
    });
});
