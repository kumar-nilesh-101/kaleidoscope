import 'module-alias/register';
import 'reflect-metadata';
import { BaseFactory, Factory, FactoryProduct } from '@/design/factory';

interface VehicleFactory {
    move(): void;
}

@Factory()
class CustomVehicleFactory extends BaseFactory<VehicleFactory> {}

@FactoryProduct(CustomVehicleFactory)
class Truck implements VehicleFactory {
    move(): void {
        console.log("moving truck");
    }
}

@FactoryProduct(CustomVehicleFactory)
class Car implements VehicleFactory {
    move(): void {
        console.log("moving car");
    }
}
