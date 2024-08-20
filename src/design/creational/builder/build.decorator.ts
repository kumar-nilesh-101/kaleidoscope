import { Type } from '@core/types';

export const BUILDER_SYMBOL = Symbol.for('builder');
export const BUILDER_PROPERTIES_META_SYMBOL = Symbol.for(
    'builder_properties_meta'
);

export function Build(buildClassType: Type): Function {
    return function <BuilderFunction extends Type>(
        constructor: BuilderFunction
    ) {
        const propertyTypeDetails = Reflect.getMetadata(
            BUILDER_PROPERTIES_META_SYMBOL,
            buildClassType.prototype
        );

        return class extends constructor {
            private buildClass;

            constructor(...args: any[]) {
                super(...args);
                this.buildClass = new buildClassType();

                for (const [key, type] of Object.entries(propertyTypeDetails)) {
                    const capitalizedKey: string =
                        key.charAt(0).toUpperCase() + key.slice(1);
                    const methodName = `set${capitalizedKey}`;

                    this[methodName] = (value: typeof type) => {
                        this.buildClass[key] = value;
                        return this;
                    };

                    this[methodName].bind(this);
                }
            }

            build() {
                return this.buildClass;
            }
        };
    };
}
