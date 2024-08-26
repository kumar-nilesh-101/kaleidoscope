# Builder

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