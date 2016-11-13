"use strict";
exports.compileUrl = function (urlTemplate, parameters) {
    if (urlTemplate == null)
        throw new Error('Can\'t compile null URL.');
    if (parameters === undefined)
        throw new Error('Can\'t compile URL with undefined parameters.');
    if (parameters == null)
        throw new Error('Can\'t compile URL with null parameters.');
    for (var field in parameters) {
        var parameter = parameters[field];
        switch (typeof parameter) {
            case 'string':
            case 'number':
                break;
            default:
                throw new Error("Can't compile URL with complex parameter '" + field + "'.");
        }
        var encodedParameter = encodeURIComponent(parameter.toString());
        urlTemplate = urlTemplate.replace(new RegExp("{" + field + "}", 'g'), encodedParameter);
    }
    return urlTemplate;
};
