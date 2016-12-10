"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Type = (function () {
    function Type(name) {
        this.name = name;
    }
    return Type;
}());
exports.Type = Type;
var TypeError = (function (_super) {
    __extends(TypeError, _super);
    function TypeError() {
        return _super.apply(this, arguments) || this;
    }
    return TypeError;
}(Error));
;
(function (Type) {
    var Int32 = (function (_super) {
        __extends(Int32, _super);
        function Int32() {
            return _super.call(this, "Int32") || this;
        }
        Int32.prototype.validate = function (value) {
            if (value == null)
                throw new Error("Value of type " + this.name + " can't be null or undefined.");
            if (typeof (value) != "number" || isNaN(Number(value)))
                throw new Error("Value of type " + this.name + " must be a number.");
            if (!isFinite(value))
                throw new Error("Value of type " + this.name + " must be a finite number.");
        };
        return Int32;
    }(Type));
    Type.Int32 = Int32;
    var String = (function (_super) {
        __extends(String, _super);
        function String() {
            return _super.call(this, "String") || this;
        }
        String.prototype.validate = function (value) { };
        return String;
    }(Type));
    Type.String = String;
    var Boolean = (function (_super) {
        __extends(Boolean, _super);
        function Boolean() {
            var _this = _super.call(this, "Boolean") || this;
            _this.validValues = ['false', 'true'];
            return _this;
        }
        Boolean.prototype.validate = function (value) {
            if (value == null)
                throw new Error("Value of type " + this.name + " can't be null or undefined.");
            var valueString = value.toString().toLowerCase();
            if (this.validValues.indexOf(valueString) < 0)
                throw new Error("Value of type " + this.name + " must be a true/false value.");
        };
        return Boolean;
    }(Type));
    Type.Boolean = Boolean;
    var Guid = (function (_super) {
        __extends(Guid, _super);
        function Guid() {
            var _this = _super.call(this, "Guid") || this;
            _this.validGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            _this.bracketedGuid = /^{[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}$/i;
            return _this;
        }
        Guid.prototype.validate = function (value) {
            if (value == null)
                throw new Error("Value of type " + this.name + " can't be null or undefined.");
            var guid = value.toString();
            if (this.bracketedGuid.test(guid))
                throw new Error('Bracketed GUIDs are not considered valid.');
            if (!this.validGuid.test(guid))
                throw new Error("Value of type " + this.name + " must be a valid RFC4122 GUID.");
        };
        return Guid;
    }(Type));
    Type.Guid = Guid;
    var Nullable = (function (_super) {
        __extends(Nullable, _super);
        function Nullable(type) {
            var _this = _super.call(this, "Nullable<" + type.name + ">") || this;
            _this.type = type;
            return _this;
        }
        Nullable.NullableTypeFabric = function (type) {
            return new Nullable(type);
        };
        Nullable.prototype.validate = function (value) {
            if (value == null)
                return;
            this.type.validate(value);
        };
        return Nullable;
    }(Type));
    Type.NullableTypeFabric = Nullable.NullableTypeFabric;
})(Type = exports.Type || (exports.Type = {}));
exports.Type = Type;
exports.Int32 = new Type.Int32();
exports.String = new Type.String();
exports.Guid = new Type.Guid();
exports.Boolean = new Type.Boolean();
exports.Nullable = Type.NullableTypeFabric;
