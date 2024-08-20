import { BUILDER_PROPERTIES_META_SYMBOL } from './build.decorator';

export function CreateSetter<DefaultValueType>(
    defaultValue?: DefaultValueType
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
