import alias from '../alias';

describe('testing alias module', () => {

    it('testing with caseInsensitive flag as true', () => {
        const testObj = {
            getName() {
                return 'returning from getName function';
            }
        };

        const aliasedObj = alias(testObj, {
            getName: ['name', 'getNamed'],
        }, true);

        expect(aliasedObj.getNamed()).toEqual(testObj.getName());
        expect(aliasedObj.GETNAMED()).toEqual(testObj.getName());
        expect(aliasedObj.name()).toEqual(testObj.getName());
        expect(aliasedObj.NAME()).toEqual(testObj.getName());
        expect(aliasedObj.Name()).toEqual(testObj.getName());

        expect(testObj).toEqual({
            getName: testObj.getName
        });
    });

    it('testing with caseInsensitive flag as false', () => {
        const testObj = {
            getName() {
                return 'returning from getName function';
            }
        };

        const aliasedObj = alias(testObj, {
            getName: ['name', 'getNamed'],
        }, false);

        expect(aliasedObj.getNamed()).toEqual(testObj.getName());
        expect(aliasedObj.name()).toEqual(testObj.getName());
        
        expect(() => aliasedObj.GETNAMED()).toThrow(TypeError);
        expect(() => aliasedObj.NAME()).toThrow(TypeError);
        expect(() => aliasedObj.Name()).toThrow(TypeError);

        expect(testObj).toEqual({
            getName: testObj.getName
        });
    });
});