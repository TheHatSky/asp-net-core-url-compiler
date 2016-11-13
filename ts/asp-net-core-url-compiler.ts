module Compiler {
    export type Parameters = {
        [index: string]: any;
    };

    export const compileUrl = (
        urlTemplate: string,
        parameters: Parameters
    ): string => {
        if (urlTemplate == null)
            throw new Error('Can\'t compile null URL.');
        if (parameters === undefined)
            throw new Error('Can\'t compile URL with undefined parameters.');
        if (parameters == null)
            throw new Error('Can\'t compile URL with null parameters.');

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

        return urlTemplate;
    }
}

export = Compiler;
