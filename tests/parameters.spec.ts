import Parameter from '../ts/parameter';

describe('Parameters', () => {
    it('should create valid simple parameter', () => {
        const parameter = new Parameter('page');
        expect(parameter.name).toBe('page');
        expect(parameter.typeString).toBeUndefined();
        expect(parameter.isNullable).toBe(false);
        expect(parameter['template']).toBe('page');
    });

    it('should create valid nullable parameter', () => {
        const parameter = new Parameter('page?');
        expect(parameter.name).toBe('page');
        expect(parameter.typeString).toBeUndefined();
        expect(parameter.isNullable).toBe(true);
        expect(parameter['template']).toBe('page?');
    });

    it('should create valid typed parameter', () => {
        const parameter = new Parameter('page:int');
        expect(parameter.name).toBe('page');
        expect(parameter.typeString).toBe('int');
        expect(parameter.isNullable).toBe(false);
        expect(parameter['template']).toBe('page:int');
    });

    it('should create valid typed nullable parameter', () => {
        const parameter = new Parameter('page:int?');
        expect(parameter.name).toBe('page');
        expect(parameter.typeString).toBe('int');
        expect(parameter.isNullable).toBe(true);
        expect(parameter['template']).toBe('page:int?');
    });

    it('should compile with optional parameter', () => {
        const parameter = new Parameter('page?');

        const result = parameter.applyToUrlTemplate('something?page={page?}&limit={limit?}', null);
        expect(result).toBe('something?page=&limit={limit?}');
    });

    it('should throw if nonexisting type provided (lorem)', () => {
        expect(() => new Parameter('page:lorem'))
            .toThrowError('Type \'lorem\' doesn\'t exist.');
    });

    it('should throw if invalid parameter type provided (int)', () => {
        const parameter = new Parameter('page:int');

        expect(() => parameter.applyToUrlTemplate(
                '{page:int}',
                "test"))
            .toThrowError(
                'Parameter \'page:int\' doesn\'t match C# Int32. ' +
                'Value of type Int32 must be a number. ' +
                'Provided value: "test".');
    });
    
    it('should throw if invalid parameter type provided (bool)', () => {
        const parameter = new Parameter('page:bool');

        expect(() => parameter.applyToUrlTemplate(
                '{page:bool}',
                "test"))
            .toThrowError(
                'Parameter \'page:bool\' doesn\'t match C# Boolean. ' +
                'Value of type Boolean must be a true/false value. ' +
                'Provided value: "test".');
    });

    it('should throw if invalid parameter type provided (guid)', () => {
        const parameter = new Parameter('page:guid');

        expect(() => parameter.applyToUrlTemplate(
                '{page:guid}',
                "test"))
            .toThrowError(
                'Parameter \'page:guid\' doesn\'t match C# Guid. ' +
                'Value of type Guid must be a valid RFC4122 GUID. ' +
                'Provided value: "test".');
    });
});
