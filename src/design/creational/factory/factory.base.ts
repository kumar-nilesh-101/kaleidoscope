import {Type} from '@core/types';
import {FACTORY_SYMBOL} from './factory.decorator';

export abstract class BaseFactory<Product> {
  protected productClasses: Type<Product>[];

  constructor() {
    this.productClasses = Reflect.getMetadata(FACTORY_SYMBOL, this.constructor);
  }

  resolveProduct(resolveType: Type<Product>, ...args: unknown[]) {
    const resolvedProductType = this.productClasses.find(
      product => product === resolveType
    );
    if (!resolvedProductType) {
      throw `Product type not recognized for factory, ${this.constructor.name}`;
    }
    return new resolvedProductType(...args);
  }
}
