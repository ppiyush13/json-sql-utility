expect.extend({
    toBeSimilarWith(received, expected) {
        const cleanSpaces = str => str.replace(/\s+/g, '');
        const pass = cleanSpaces(received) === cleanSpaces(expected);

        if(pass) {
            return {
                pass: true,
                message: () => `expected ${received} to not match with ${expected}`,
            }
        }
        else {
            return {
                pass: false,
                message: () => `expected ${received} to match with ${expected}`,
            };
        }
    }
})