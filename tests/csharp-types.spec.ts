import { String, Boolean, Guid, Int32, Nullable } from './../ts/csharp-types';

describe('C# types', () => {
    describe('Nullable', () => {
        it('null should be valid value', () => {
            expect(() => Nullable(Int32).validate(null)).not.toThrow();
        });
        it('valid underlying type value should be valid value', () => {
            expect(() => Nullable(Int32).validate(12)).not.toThrow();
        });
    });

    describe('Int32', () => {
        it('12 should be valid value', () => {
            expect(() => Int32.validate(12)).not.toThrow();
        });
        
        it('null should be invalid value', () => { 
            expect(() => Int32.validate(null))
                .toThrowError('Value of type Int32 can\'t be null or undefined.');
        });
        
        it('+infinity should be invalid value', () => {
            expect(() => Int32.validate(Number.POSITIVE_INFINITY))
                .toThrowError('Value of type Int32 must be a finite number.');
        });

        it('-infinity should be invalid value', () => {
            expect(() => Int32.validate(Number.NEGATIVE_INFINITY))
                .toThrowError('Value of type Int32 must be a finite number.');
        });

        it('NaN should be invalid value', () => {
            expect(() => Int32.validate(Number.NaN))
                .toThrowError('Value of type Int32 must be a number.');
        });
    });

    describe('Boolean', () => {
        it('null should be invalid value', () => {
            expect(() => Boolean.validate(null))
                .toThrowError('Value of type Boolean can\'t be null or undefined.');
        });
        it('bolean values should be valid', () => {
            expect(() => Boolean.validate(true))
                .not
                .toThrow();
            expect(() => Boolean.validate(false))
                .not
                .toThrow();
        });
        it('string bolean values should be valid', () => {
            expect(() => Boolean.validate('True'))
                .not
                .toThrow();
            expect(() => Boolean.validate('falsE'))
                .not
                .toThrow();
        });
        it('should throw on other string values', () => {
            expect(() => Boolean.validate('Banana'))
                .toThrowError('Value of type Boolean must be a true/false value.');
        });
    });

    describe('Guid', () => {
        it('null should be invalid value', () => {
            expect(() => Guid.validate(null))
                .toThrowError('Value of type Guid can\'t be null or undefined.');
        });
        it('184e728e-eca6-30ad-8e03-25f7e664469a should be valid GUID', () => {
            expect(() => Guid.validate('184e728e-eca6-30ad-8e03-25f7e664469a'))
                .not
                .toThrow();
        });
        it('{184e728e-eca6-30ad-8e03-25f7e664469a} should throw "bracketed GUID" error', () => {
            expect(() => Guid.validate('{184e728e-eca6-30ad-8e03-25f7e664469a}'))
                .toThrowError('Bracketed GUIDs are not considered valid.');
        });
        it('should throw on other string values', () => {
            expect(() => Guid.validate('Banana'))
                .toThrowError('Value of type Guid must be a valid RFC4122 GUID.');
        });
    });
});
