import {
    BaseFactory,
    Factory,
    FactoryProduct,
} from 'src/design/creational/factory';
import { FACTORY_SYMBOL } from 'src/design/creational/factory/factory.decorator';

describe('Factory design pattern', () => {
    describe('Factory decorator', () => {
        it('should add an empty array to metdata of factory class', () => {
            @Factory()
            class TestFactory {}

            const metadata = Reflect.getMetadata(FACTORY_SYMBOL, TestFactory);
            expect(metadata).toEqual([]);
        });
    });

    describe('FactoryProduct decorator', () => {
        it('should update Factory metadata with FactoryProduct names', () => {
            @Factory()
            class TestFactory {}
            @FactoryProduct(TestFactory)
            class TestProduct1 {}
            @FactoryProduct(TestFactory)
            class TestProduct2 {}

            const metadata = Reflect.getMetadata(FACTORY_SYMBOL, TestFactory);
            expect(metadata).toEqual(
                expect.arrayContaining([TestProduct1, TestProduct2])
            );
        });
    });

    describe('Resolving product class from factory', () => {
        it('should resolve the correct product class', () => {
            interface Test {
                someFunc(): string;
            }
            @Factory()
            class TestFactory extends BaseFactory<Test> {}
            @FactoryProduct(TestFactory)
            class TestProduct1 implements Test {
                someFunc(): string {
                    return 'TestProduct1';
                }
            }
            @FactoryProduct(TestFactory)
            class TestProduct2 implements Test {
                someFunc(): string {
                    return 'TestProduct2';
                }
            }

            const factory = new TestFactory();
            const product1 = factory.resolveProduct(TestProduct1);
            const product2 = factory.resolveProduct(TestProduct2);

            expect(product1).toBeInstanceOf(TestProduct1);
            expect(product1.someFunc()).toEqual('TestProduct1');
            expect(product2).toBeInstanceOf(TestProduct2);
            expect(product2.someFunc()).toEqual('TestProduct2');
        });
    });

    it('should throw error if the product class is not registered', () => {
        interface Test {
            someFunc(): string;
        }
        @Factory()
        class TestFactory extends BaseFactory<Test> {}
        @FactoryProduct(TestFactory)
        class TestProduct1 implements Test {
            someFunc(): string {
                return 'TestProduct1';
            }
        }
        @FactoryProduct(TestFactory)
        class TestProduct2 implements Test {
            someFunc(): string {
                return 'TestProduct2';
            }
        }

        class TestProduct3 implements Test {
            someFunc(): string {
                return 'TestProduct3';
            }
        }

        try {
            const factory = new TestFactory();
            factory.resolveProduct(TestProduct3);
        } catch (err: any) {
            expect(err.toString()).toEqual(
                'Product type not recognized for factory, TestFactory'
            );
        }
    });
});
