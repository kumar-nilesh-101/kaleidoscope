import { Prototype } from '@design/creational/prototype';

describe('Prototype design pattern', () => {
    it('should create prototype for the decorated class', () => {
        @Prototype()
        class Test {
            private field1 = 'test field 1';
            private field2 = new Map();

            declare clone: () => Test;
        }

        const testInst = new Test();
        const clone = testInst.clone();

        expect(clone).toBeInstanceOf(Test);
        expect(clone).not.toEqual(testInst);
    });
});
