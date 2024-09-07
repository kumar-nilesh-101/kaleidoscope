import 'reflect-metadata';
import { Prototype } from '@design/creational/prototype';

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

console.log(clone instanceof Cloneable);

console.log(inst === clone);
console.log(inst.field2 === clone.field2);
