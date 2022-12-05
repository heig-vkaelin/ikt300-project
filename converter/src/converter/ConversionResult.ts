import IUnit from '../domain/IUnit';

export class ConversionResult {
  fromUnit: IUnit;
  toUnit: IUnit;
  fromValue: number;
  toValue: number;

  constructor(fromUnit: IUnit, toUnit: IUnit, fromValue: number, toValue: number) {
    this.fromUnit = fromUnit;
    this.toUnit = toUnit;
    this.fromValue = fromValue;
    this.toValue = toValue;
  }

  toString(): string {
    return `${this.fromValue} ${this.fromUnit.symbol} = ${this.toValue} ${this.toUnit.symbol}`;
  }
}
