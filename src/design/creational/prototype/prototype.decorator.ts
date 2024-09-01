import { Type } from '@core/types';

export function Prototype(): Function {
    return function <Prototypal extends Type>(constructor: Prototypal) {
        return class extends constructor {
            clone() {
                return structuredClone(this);
            }
        };
    };
}
