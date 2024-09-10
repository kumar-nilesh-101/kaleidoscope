import { Singleton } from '@design/creational/singleton';

describe('Singleton design pattern', () => {
    it('should create and allow only one instance', () => {
        @Singleton()
        class Test {
            field1: number;
            field2 = Math.random();
            constructor(...nums: number[]) {
                this.field1 = nums.reduce((acc, ele) => {
                    return (acc += ele);
                }, 0);
            }
        }

        const instance1 = new Test(1, 2, 3, 4, 5);
        const instance2 = new Test(6, 7, 8, 9, 10);

        expect(instance1).toEqual(instance2);
        expect(instance1.field2).toEqual(instance2.field2);
    });

    it('should create valid instances of the class', () => {
        @Singleton()
        class Test {
            field1: number;
            field2 = Math.random();
            constructor(...nums: number[]) {
                this.field1 = nums.reduce((acc, ele) => {
                    return (acc += ele);
                }, 0);
            }
        }
        const instance1 = new Test(1, 2, 3, 4, 5);
        const instance2 = new Test(6, 7, 8, 9, 10);

        expect(instance1 instanceof Test).toBe(true);
        expect(instance2 instanceof Test).toBe(true);
    });
});
