import QuantityType from './QuantityType';

interface IUnit {
  id: string;
  name: string;
  aliases?: string[];
  types: QuantityType[];
  symbol: string;
  convertToBase(value: number): number;
  convertFromBase(value: number): number;
}

export default IUnit;
