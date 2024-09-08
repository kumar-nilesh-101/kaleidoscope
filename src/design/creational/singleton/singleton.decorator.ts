import { Type } from '@core/types';

export function Singleton() {
    let instance: Object;
    return function <SingletonFunction extends Type>(
        constructor: SingletonFunction
    ) {
        return <SingletonFunction>class extends constructor {
            constructor(...args: any[]) {
                if (instance) {
                    return instance;
                } else {
                    super(...args);
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    instance = this;
                    return instance;
                }
            }
        };
    };
}
