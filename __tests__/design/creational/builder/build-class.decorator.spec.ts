import { Build, CreateSetter } from '@design/creational/builder';

describe('Builder design pattern', () => {
    describe('Build decorator', () => {
        it('should add setter methods to the builder class', () => {
            class TestBuildClass {
                @CreateSetter()
                field1: string;
                @CreateSetter()
                field2: number;
            }

            @Build(TestBuildClass)
            class TestBuilder {
                declare setField1: (val: string) => this;
                declare setField2: (val: number) => this;
                declare build: () => TestBuildClass;
            }

            const testBuilder = new TestBuilder();
            const instance = testBuilder
                .setField1('test value')
                .setField2(10)
                .build();

            expect(testBuilder.setField1).toBeDefined();
            expect(testBuilder.setField2).toBeDefined();
            expect(instance).toBeInstanceOf(TestBuildClass);
        });
    });
});
