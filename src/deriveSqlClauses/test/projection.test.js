import deriveProjection from '../projection';

describe('testing projection output', () => {
    it('when fields are defined', () => {
        const out = deriveProjection({
            fields: ['A', 'B', 'C'],
            aggregation: [
                {
                    fn: 'count',
                    args: '*',
                    alias: 'CNT'
                },
            ],
            groupBy: ['A', 'B', 'C', 'D'],
        });
        expect(out).toEqual('A, B, C, count(*) AS CNT');
    });

    it('when fields are not defined', () => {
        const out = deriveProjection({
            fields: [],
            aggregation: [
                {
                    fn: 'count',
                    args: '*',
                    alias: 'CNT'
                },
            ],
            groupBy: ['A', 'B', 'C', 'D'],
        });
        expect(out).toEqual('A, B, C, D, count(*) AS CNT');
    });
});