import Parameter from '../ts/parameter';

describe('Parameters', () => {
    it('should create valid simple parameter', () => {
        const parameter = new Parameter('page');
        expect(parameter.name).toBe('page');
        expect(parameter.type).toBeUndefined();
        expect(parameter.isNullable).toBe(false);
        expect(parameter['template']).toBe('page');
    });

    it('should create valid nullable parameter', () => {
        const parameter = new Parameter('page?');
        expect(parameter.name).toBe('page');
        expect(parameter.type).toBeUndefined();
        expect(parameter.isNullable).toBe(true);
        expect(parameter['template']).toBe('page?');
    });

    it('should create valid typed parameter', () => {
        const parameter = new Parameter('page:int');
        expect(parameter.name).toBe('page');
        expect(parameter.type).toBe('int');
        expect(parameter.isNullable).toBe(false);
        expect(parameter['template']).toBe('page:int');
    });

    it('should create valid typed nullable parameter', () => {
        const parameter = new Parameter('page:int?');
        expect(parameter.name).toBe('page');
        expect(parameter.type).toBe('int');
        expect(parameter.isNullable).toBe(true);
        expect(parameter['template']).toBe('page:int?');
    });

    it('should compile with optional parameter', () => {
        const parameter = new Parameter('page?');

        const result = parameter.applyToUrlTemplate('something?page={page?}&limit={limit?}', null);
        expect(result).toBe('something?page=&limit={limit?}');
    });

    it('should throw if invalid parameter type provided (int)', () => {
        const parameter = new Parameter('page:int');

        expect(() => parameter.applyToUrlTemplate(
                '{page:int}',
                { page: "test" }))
            .toThrowError('Parameter \'page\' has to match C# int, but string was provided.');
    });
    
    it('should throw if invalid parameter type provided (bool)', () => {
        const parameter = new Parameter('page:int');

        expect(() => parameter.applyToUrlTemplate(
                '{page:bool}',
                { page: "test" }))
            .toThrowError('Parameter \'page\' has to match C# bool, but string was provided.');
    });

    it('should throw if invalid parameter type provided (guid)', () => {
        const parameter = new Parameter('page:int');

        expect(() => parameter.applyToUrlTemplate(
                '{page:guid}',
                { page: "test" }))
            .toThrowError('Parameter \'page\' has to match C# guid, but string was provided.');
    });
});
