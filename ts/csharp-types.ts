export abstract class Type {
    public abstract get name(): string;
    public abstract validate<TValue>(value: TValue): void;
}

class TypeError extends Error {};

export namespace Type {
    export class Int32 extends Type {
        public get name(): string { return 'Int32'; };

        public validate<TValue>(value: TValue): void {
            if (value == null)
                throw new Error(`Value of type ${this.name} can't be null or undefined.`);

            if (typeof(value) != "number" || isNaN(Number(value)))
                throw new Error(`Value of type ${this.name} must be a number.`);

            if (!isFinite(value))
                throw new Error(`Value of type ${this.name} must be a finite number.`);
        }
    }

    export class String extends Type {
        public get name(): string { return 'String'; };

        public validate<TValue>(value: TValue): void { }
    }

    export class Boolean extends Type {
        public get name(): string { return 'Boolean'; };

        private validValues = ['false', 'true'];

        public validate<TValue>(value: TValue): void {
            if (value == null)
                throw new Error(`Value of type ${this.name} can't be null or undefined.`);

            const valueString = value.toString().toLowerCase();
            if (this.validValues.indexOf(valueString) < 0)
                throw new Error(`Value of type ${this.name} must be a true/false value.`);            
        }
    }

    export class Guid extends Type {
        private readonly validGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        private readonly bracketedGuid = /^{[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}}$/i;
        public get name(): string { return 'Guid'; };

        public validate<TValue>(value: TValue): void {
            if (value == null)
                throw new Error(`Value of type ${this.name} can't be null or undefined.`);

            const guid = value.toString();
            if (this.bracketedGuid.test(guid))
                throw new Error('Bracketed GUIDs are not considered valid.');

            if (!this.validGuid.test(guid))
                throw new Error(`Value of type ${this.name} must be a valid RFC4122 GUID.`);            
        }
    }

    class Nullable<T extends Type> extends Type {
        public get name(): string { return `Nullable<${this.type.name}>`; };

        constructor(private type: T) {
            super();
        }

        public static NullableTypeFabric<T extends Type>(type: T) {
            return new Nullable(type);
        }

        public validate<TValue>(value: TValue): void {
            if (value == null)
                return;

            this.type.validate(value);
        }
    }

    export const NullableTypeFabric = Nullable.NullableTypeFabric;    
}

export const Int32 = new Type.Int32();
export const String = new Type.String();
export const Guid = new Type.Guid();
export const Boolean = new Type.Boolean();
export const Nullable = Type.NullableTypeFabric;
