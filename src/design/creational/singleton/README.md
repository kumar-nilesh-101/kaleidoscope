## Singleton

Singleton classes ensure providing the same instance every time they are instantiated, or an instance is created and returned if the class was not instantiated before. A typical singleton class does not expose the constructor but a `static` method responsible for creating and returning the singleton instance.

But that is not very intituitive, is it? Consider this
```typescript
class ExampleSingletonClass {
    private static instance: ExampleSingletonClass = null;
    
    static getInstance(): ExampleSingletonClass {
        if (ExampleSingletonClass.instance) {
            return ExampleSingletonClass.instance;
        } else {
            ExampleSingletonClass.instance = new ExampleSingletonClass();
            return ExampleSingletonClass.instance;
        }
    }

    private constructor() {}
}
```
To create an instance you would do

```typescript
const instance = ExampleSingletonClass.getInstance();
```
Compare it with `kaleidoscope/design` where you only need this

```typescript
@Singleton()
class ExampleSingletonClass {}

const instance = new ExampleSingletonClass();
```