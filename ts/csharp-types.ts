abstract class Type {
    public abstract validate<TValue>(value: TValue): boolean;
}

namespace Type {
    export class Int32 extends Type {
        public validate<TValue>(value: TValue): boolean {
            if (value == null)
                return true;

            if (typeof(value) != "number")
                return false;

            if (!isFinite(value))
                return false;

            return true;
        }
    }

    export class Nullable<T extends Type> extends Type {
        constructor(private type: T) {
            super();
        }

        public validate<TValue>(value: TValue): boolean {
            if (value == null)
                return true;

            return this.type.validate(value);
        }        
    }
}

export const Int32 = new Type.Int32();
export const Nullable = Type.Nullable;
