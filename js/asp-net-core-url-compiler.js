"use strict";
var parameter_1 = require("./parameter");
var Compiler;
(function (Compiler) {
    Compiler.compileUrl = function (urlTemplate, parameterValues) {
        if (urlTemplate == null)
            throw new Error('Can\'t compile null URL.');
        if (parameterValues === undefined)
            throw new Error('Can\'t compile URL with undefined parameters.');
        if (parameterValues == null)
            throw new Error('Can\'t compile URL with null parameters.');
        var parametersInUrl = parameter_1["default"].parseUrlTemplate(urlTemplate);
        for (var _i = 0, parametersInUrl_1 = parametersInUrl; _i < parametersInUrl_1.length; _i++) {
            var parameter = parametersInUrl_1[_i];
            var value = parameterValues[parameter.name];
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
    };
})(Compiler || (Compiler = {}));
module.exports = Compiler;
