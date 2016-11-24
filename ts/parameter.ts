import { String, Guid, Boolean, Type, Int32, Nullable } from './csharp-types';

const typesDictionary: {[type: string]: Type } = {
    'int': Int32,
    'guid': Guid,
    'bool': Boolean
};

const typeDelimeter = ':';
const nullableMark = '?';

const escapeStringRegexp = (s: string) => {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export default class Parameter {
    private readonly template: string;
    private readonly type: Type;

    public readonly name: string;
    public readonly isNullable: boolean;
    public readonly typeString: string;

    constructor(parameterTemplate: string) {
        this.template = parameterTemplate.trim();

        this.isNullable = this.template.charAt(this.template.length - 1) == nullableMark;

        let template = this.template;
        if (this.isNullable)
            template = template.substring(0, template.length - 1);

        const parts = template.split(typeDelimeter);
        this.name = parts[0];
        if (parts.length > 1) {
            this.typeString = parts[1];

            const type = typesDictionary[this.typeString];
            if (type == null)
                throw new Error(`Type '${this.typeString}' doesn't exist.`);

            this.type = this.isNullable
                ? Nullable(type)
                : type;
        }
        else
            this.type = String;
    }

    public static parseUrlTemplate(urlTemplate: string): Parameter[] {
        if (urlTemplate == null)
            throw new Error('urlTemplate == null');

        const match = urlTemplate.match(/{[^{]*}/g);
        if (!match)
            return []; 

        return match 
            .map(p => p.substring(1, p.length - 1))
            .map(p => new Parameter(p));
    }

    public applyToUrlTemplate(urlTemplate: string, value: any): string {
        if (value == null && !this.isNullable)
            throw new Error(`Parameter '${this.name}' is not provided.`);

        try {
            this.type.validate(value);
        } catch (error) {
            throw new Error(
                `Parameter '${this.template}' doesn't match C# ${this.type.name}. ` +
                `${error.message} ` +
                `Provided value: ${JSON.stringify(value)}.`
            );
        }

        const template = escapeStringRegexp(this.template);
        const regexp = new RegExp(`{${template}}`, 'g');

        if (value == null)
            return urlTemplate.replace(regexp, "");

        let encodedParameter = encodeURIComponent(value);
        
        return urlTemplate.replace(regexp, encodedParameter);
    }
}
