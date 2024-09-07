import { Type } from '@core/types';

export function Prototype(): Function {
    return function <Prototypal extends Type>(constructor: Prototypal) {
        return class extends constructor {
            clone() {
                const clonedInstance = structuredClone(this);
                Object.setPrototypeOf(clonedInstance, this);
                return clonedInstance;
            }
        };
    };
}
