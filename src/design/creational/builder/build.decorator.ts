export const BUILDER_SYMBOL = Symbol.for('builder');
export const BUILDER_PROPERTIES_META_SYMBOL = Symbol.for(
    'builder_properties_meta'
);

export function Build(buildClassType: any): Function {
    return function <BuilderFunction extends { new (...args: any[]): any }>(
        constructor: BuilderFunction
    ) {
        const propertyTypeDetails = Reflect.getMetadata(
            BUILDER_PROPERTIES_META_SYMBOL,
            buildClassType.prototype
        );

        return class extends constructor {
            private buildClass: typeof buildClassType;

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

            build(): typeof buildClassType {
                return this.buildClass;
            }
        };
    };
}

export function CreateSetter<DefaultValueType>(
    defaultValue: DefaultValueType
): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const propertyType = Reflect.getMetadata(
            'design:type',
            target,
            propertyKey
        );

        Reflect.defineMetadata(
            BUILDER_PROPERTIES_META_SYMBOL,
            {
                [propertyKey]: propertyType,
                ...(Reflect.getMetadata(
                    BUILDER_PROPERTIES_META_SYMBOL,
                    target
                ) || {}),
            },
            target
        );

        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            value: defaultValue,
            writable: true,
        });
    };
}
