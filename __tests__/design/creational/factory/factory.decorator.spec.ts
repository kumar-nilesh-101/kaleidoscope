import { Factory } from 'src/design/creational/factory';
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
});
