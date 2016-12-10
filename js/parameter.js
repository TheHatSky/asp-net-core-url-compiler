"use strict";
var csharp_types_1 = require("./csharp-types");
var typesDictionary = {
    'int': csharp_types_1.Int32,
    'guid': csharp_types_1.Guid,
    'bool': csharp_types_1.Boolean
};
var typeDelimeter = ':';
var nullableMark = '?';
var escapeStringRegexp = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
var Parameter = (function () {
    function Parameter(parameterTemplate) {
        this.template = parameterTemplate.trim();
        this.isNullable = this.template.charAt(this.template.length - 1) == nullableMark;
        var template = this.template;
        if (this.isNullable)
            template = template.substring(0, template.length - 1);
        var parts = template.split(typeDelimeter);
        this.name = parts[0];
        if (parts.length > 1) {
            this.typeString = parts[1];
            var type = typesDictionary[this.typeString];
            if (type == null)
                throw new Error("Type '" + this.typeString + "' doesn't exist.");
            this.type = this.isNullable
                ? csharp_types_1.Nullable(type)
                : type;
        }
        else
            this.type = csharp_types_1.String;
    }
    Parameter.parseUrlTemplate = function (urlTemplate) {
        if (urlTemplate == null)
            throw new Error('urlTemplate == null');
        var match = urlTemplate.match(/{[^{]*}/g);
        if (!match)
            return [];
        return match
            .map(function (p) { return p.substring(1, p.length - 1); })
            .map(function (p) { return new Parameter(p); });
    };
    Parameter.prototype.applyToUrlTemplate = function (urlTemplate, value) {
        if (value == null && !this.isNullable)
            throw new Error("Parameter '" + this.name + "' is not provided.");
        try {
            this.type.validate(value);
        }
        catch (error) {
            throw new Error("Parameter '" + this.template + "' doesn't match C# " + this.type.name + ". " +
                (error.message + " ") +
                ("Provided value: " + JSON.stringify(value) + "."));
        }
        var template = escapeStringRegexp(this.template);
        var regexp = new RegExp("{" + template + "}", 'g');
        if (value == null)
            return urlTemplate.replace(regexp, "");
        var encodedParameter = encodeURIComponent(value);
        return urlTemplate.replace(regexp, encodedParameter);
    };
    return Parameter;
}());
exports.__esModule = true;
exports["default"] = Parameter;
