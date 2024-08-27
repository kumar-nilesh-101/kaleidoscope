import { CreateSetter } from '@design/creational/builder';
import { BUILDER_PROPERTIES_META_SYMBOL } from '@design/creational/builder/build.decorator';

describe('Builder design pattern', () => {
    describe('CreateSetter decorator', () => {
        it('should update build class metadata with field details', () => {
            class TestBuildClass {
                @CreateSetter()
                field1: string;
                @CreateSetter()
                field2: number;
            }

            const buildClassMetadata = Reflect.getMetadata(
                BUILDER_PROPERTIES_META_SYMBOL,
                TestBuildClass.prototype
            );

            expect(buildClassMetadata.field1).toBeDefined();
            expect(buildClassMetadata.field2).toBeDefined();
        });
    });
});
