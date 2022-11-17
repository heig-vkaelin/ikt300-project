import ConversionParameters from "./ConversionParameters";
import IUnit from "./IUnit";
import QuantityType from "./QuantityType";

class CustomaryUnit implements IUnit {
  public name: string;
  public types: QuantityType[];
  public symbol: string;
  public parameters: ConversionParameters;

  constructor(
    name: string,
    types: QuantityType[],
    symbol: string,
    parameters: ConversionParameters
  ) {
    this.name = name;
    this.types = types;
    this.symbol = symbol;
    this.parameters = parameters;
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
