import IUnit from './IUnit';
import QuantityType from './QuantityType';

class BaseUnit implements IUnit {
  public id: string;
  public name: string;
  public types: QuantityType[];
  public symbol: string;

  constructor(id: string, name: string, types: QuantityType[], symbol: string) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.symbol = symbol;
  }

  public convertToBase(value: number): number {
    return value;
  }

  public convertFromBase(value: number): number {
    return value;
  }
}

export default BaseUnit;
