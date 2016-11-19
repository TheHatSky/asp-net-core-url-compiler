import { Int32 } from './csharp-types';

const typeDelimeter = ':';
const nullableMark = '?';

const escapeStringRegexp = (s: string) => {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export default class Parameter {
    private readonly template: string;

    public readonly name: string;
    public readonly isNullable: boolean;
    public readonly type: string;

    constructor(parameterTemplate: string) {
        this.template = parameterTemplate.trim();

        this.isNullable = this.template.charAt(this.template.length - 1) == nullableMark;

        let template = this.template;
        if (this.isNullable)
            template = template.substring(0, template.length - 1);

        const parts = template.split(typeDelimeter);
        this.name = parts[0];
        if (parts.length > 1)
            this.type = parts[1];
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

        const template = escapeStringRegexp(this.template);
        const regexp = new RegExp(`{${template}}`, 'g');

        if (value == null)
            return urlTemplate.replace(regexp, "");

        let encodedParameter = encodeURIComponent(value);
        
        return urlTemplate.replace(regexp, encodedParameter);
    }
}
