import { Type } from '@core/types';

export function Singleton() {
    let instance: Object;
    return function <SingletonFunction extends Type>(
        constructor: SingletonFunction
    ) {
        return <SingletonFunction>class {
            constructor(...args: any[]) {
                if (instance) {
                    return instance;
                } else {
                    instance = new constructor(...args);
                    Object.setPrototypeOf(instance, constructor);
                }
            }
        };
    };
}
