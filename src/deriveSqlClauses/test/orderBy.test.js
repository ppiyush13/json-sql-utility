import deriveOrderBy from '../orderBy';

describe('testing orderBy output', () => {
    it('when fields are defined', () => {
        const out = deriveOrderBy([
            {
                field: 'A',
            },
            'B',
            {
                field: 'C',
                dir: 'ASC',
            },
            {
                field: 'D',
                dir: 'DESC',
            },
        ]);
        expect(out).toEqual('A, B, C ASC, D DESC');
    });
});