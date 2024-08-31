# Kaleidoscope

Add design patterns in your application with ease, Kaleidoscope abstracts the complexities and exposes a simple to use interface for integrating design patterns in your application.

## Builder

Builder pattern is a stepped process to create a complex object by eliminating the long list of constructor arguments and if else checks.

Despite the cleaner interface it offers; you'll end up maintaining more classes, interfaces and probably files. Although with `kaleidoscope/design` you'll need two classes, one with all the properties and second as its builder.

Let's see how to leverage `kaleidoscope/design`,

```ts
class GamePlayer {
    @CreateSetter()
    name: string;
    @CreateSetter()
    rank: string;
    @CreateSetter()
    defense: number;
    @CreateSetter()
    offense: number;
    @CreateSetter()
    weaponCapacity: number;
}

@Build(GamePlayer)
class GamePlayerBuilder {
    /**
     * Since decorators cannot modify the type of the class it is used on. We need to explicitly inform typescript about the methods which will be there on the class.
    */
    declare setName: (val: string) => this;
    declare setRank: (val: string) => this;
    declare setDefense: (val: number) => this;
    declare setOffense: (val: number) => this;
    declare setWeaponCapacity: (val: number) => this;
    declare build: () => this;
}

const gamePlayerBuilder = new GamePlayerBuilder();
const warriorGamePlayer = gamePlayerBuilder
    .setName('warrior')
    .setDefense(100)
    .setRank('master-warrior')
    .build();

console.log(warriorGamePlayer);
```
The class which you need to build will look similar to a DTO, containing just the fields. Use `@CreateSetter` to create a setter method for the class and the builder class will have the `set<CapitalizedAttributeName>` method added to it.

Use the `@Build` decorator to create a builder class, you'll need to add a `declare` statement to let the typescript compiler know about them. This is just about it.

*If a field is not decorated with `CreateSetter` it will not have a setter method in the build class.*

## Factory

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
