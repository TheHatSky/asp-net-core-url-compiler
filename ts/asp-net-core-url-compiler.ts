import Parameter from './parameter';

module Compiler {
    export type Parameters = {
        [index: string]: any;
    };

    export const compileUrl = (
        urlTemplate: string,
        parameterValues: Parameters
    ): string => {
        if (urlTemplate == null)
            throw new Error('Can\'t compile null URL.');
        if (parameterValues === undefined)
            throw new Error('Can\'t compile URL with undefined parameters.');
        if (parameterValues == null)
            throw new Error('Can\'t compile URL with null parameters.');

        const parametersInUrl = Parameter.parseUrlTemplate(urlTemplate);

        for (let parameter of parametersInUrl) {
            const value = parameterValues[parameter.name];

            urlTemplate = parameter.applyToUrlTemplate(urlTemplate, value);
        }
/*
        for (let field in parameters)
        {
            let parameter = parameters[field];
            switch (typeof parameter)
            {
                case 'string':
                case 'number':
                    break;
                default:
                    throw new Error(`Can't compile URL with complex parameter '${field}'.`);
            }

            let encodedParameter = encodeURIComponent(parameter.toString());

            urlTemplate = urlTemplate.replace(new RegExp(`{${field}}`, 'g'), encodedParameter);
        }
*/
        return urlTemplate;
    }
}

export = Compiler;
