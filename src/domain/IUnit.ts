import QuantityType from "./QuantityType";

interface IUnit {
  name: string;
  types: QuantityType[];
  symbol: string;
  convertToBase(value: number): number;
  convertFromBase(value: number): number;
}

export default IUnit;
