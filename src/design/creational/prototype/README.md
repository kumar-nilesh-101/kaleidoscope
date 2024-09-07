## Prototype

Prototyping your objects is a quick and clean way to produce deep copies without much hassle, but implementing the cloning functionality can be. There are type checks to be put in place, you have to be careful about handling circular dependencies and recursively cloning high level data structues and these are just a few cases from the list.

With `kaleidoscope/design` you can have the clone functionality within your class itself as a method but you dont have to worry about the definition.

```ts
@Prototype()
class Cloneable {
    private field1: number;
    field2: Map<number, number>;

    constructor(f1: number) {
        this.field1 = f1;
        this.field2 = new Map();
        this.field2.set(1, 2394);
    }

    declare clone: () => Cloneable;
}

const inst = new Cloneable(10);
const clone = inst.clone();

console.log(inst === clone); // false
console.log(inst.field2 === clone.field2); // false
```
Due to typescript limitations the prototype class must have a `declare clone: () => Type` statement to inform the compiler of the changes in the type of the class.