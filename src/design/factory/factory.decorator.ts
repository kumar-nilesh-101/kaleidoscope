import { ClassDecorator } from "@/core/types";

export const FACTORY_SYMBOL = Symbol.for('factory');

export function Factory(): ClassDecorator {
    return function <FactoryFunction extends Function>(constructor: FactoryFunction) {
        Reflect.defineMetadata(FACTORY_SYMBOL, {}, constructor);
    }
}

export function FactoryProduct<FactoryFunction extends Function>(factoryClass: FactoryFunction): ClassDecorator {
    return function<ProductFunction extends Function>(constructor: ProductFunction) {
        Reflect.defineMetadata(
            FACTORY_SYMBOL,
            [ ...Reflect.getMetadata(FACTORY_SYMBOL, factoryClass), constructor ],
            factoryClass
        );
    }
}
