import limit from "../limit";

describe('testing limit module', () => {
    it.each([
        [
            0,
            '0'
        ],
        [
            {
                count: '50'
            },
            '50'
        ],
        [
            {
                count: '50',
                offset: 1000
            },
            '1000, 50'
        ],
        [
            null,
            ''
        ],
    ])('Testing using it.each', (rec, exp) => {
        expect(limit(rec)).toEqual(exp);
    });

    it.each([
        [
            {},
            'Please specify limit or offset !'
        ],
        [
            {
                offset: 20,
            },
            'Offset without count is not valid !'
        ],
    ])('Negative testing', (rec, expectedError) => {
        expect(() => limit(rec)).toThrow(expectedError);
    });
});