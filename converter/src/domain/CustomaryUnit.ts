import ConversionParameters from './ConversionParameters';
import IUnit from './IUnit';
import QuantityType from './QuantityType';

class CustomaryUnit implements IUnit {
  public id: string;
  public name: string;
  public types: QuantityType[];
  public symbol: string;
  public baseUnit: string;
  public parameters: ConversionParameters;

  constructor(
    id: string,
    name: string,
    types: QuantityType[],
    symbol: string,
    parameters: ConversionParameters,
    baseUnit: string,
  ) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.symbol = symbol;
    this.parameters = parameters;
    this.baseUnit = baseUnit;
  }

  public convertToBase(value: number): number {
    const { a, b, c, d } = this.parameters;

    return (a + b * value) / (c + d * value);
  }

  public convertFromBase(value: number): number {
    const { a, b, c, d } = this.parameters;

    return (-a + c * value) / (b - d * value);
  }
}

export default CustomaryUnit;
