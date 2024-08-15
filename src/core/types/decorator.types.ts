export type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
export type PropertyDecorator = (target: Object, key: PropertyKey) => void;
export type MethodDecorator = <T>(target: Object, key: string | symbol, propertyDescriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
export type ParameterDecorator = (target: Object, key: string | symbol, parameterIndex: number) => void;