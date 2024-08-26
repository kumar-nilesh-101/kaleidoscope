# Factory

Factory pattern is a way of creating objects of subclasses as an instance of the classes but with the flexibility that subclasses can alter the type of the instance upon creation.

Lets have see how `kaleidoscope/design` helps you clean up you code base.

```ts
interface VehicleFactory {
    move(): void;
}

@Factory()
class CustomVehicleFactory extends BaseFactory<VehicleFactory> {}

@FactoryProduct(CustomVehicleFactory)
class Truck implements VehicleFactory {
    private tyres: number;
    constructor(tyres: number) {
        this.tyres = tyres;
    }

    move(): void {
        console.log(`moving truck on ${this.tyres} tyres`);
    }
}

@FactoryProduct(CustomVehicleFactory)
class Car implements VehicleFactory {
    private tyres: number;
    constructor(tyres: number) {
        this.tyres = tyres;
    }

    move(): void {
        console.log(`moving car on ${this.tyres} tyres`);
    }
}

const x = new CustomVehicleFactory();
const y = x.resolveProduct(Truck, 18);
y.move();
```

`@Factory` Registers a class as the factory to resolve subtypes of a superclass. The decorated class must extend `BaseFactory` to have to the default implementation of the `resolveProduct` (*Override this method for a custom factory logic*).

`@FactoryProduct` Marks a class as the product of a factory class. Requires a type which will act as the factory for the class.
