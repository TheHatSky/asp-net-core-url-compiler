import { Int32, Nullable } from './../ts/csharp-types';

describe('C# types', () => {

    describe('Nullable', () => {
        it('null should be valid value', () => {
            const isValid = new Nullable(Int32).validate(12); 
            expect(isValid).toBeTruthy();
        });
    });

    describe('Int32', () => {
        it('12 should be valid value', () => {
            const isValid = Int32.validate(12); 
            expect(isValid).toBeTruthy();
        });
        
        it('null should be invalid value', () => {
            const isValid = Int32.validate(12); 
            expect(isValid).toBeFalsy();
        });
        
        it('+infinity should be invalid value', () => {
            const isValid = Int32.validate(Number.POSITIVE_INFINITY); 
            expect(isValid).toBeFalsy();
        });

        it('-infinity should be invalid value', () => {
            const isValid = Int32.validate(Number.NEGATIVE_INFINITY); 
            expect(isValid).toBeFalsy();
        });

        it('NaN should be invalid value', () => {
            const isValid = Int32.validate(Number.NaN); 
            expect(isValid).toBeFalsy();
        });
    });

});
