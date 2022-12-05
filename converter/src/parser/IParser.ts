import BaseUnit from '../domain/BaseUnit';
import CustomaryUnit from '../domain/CustomaryUnit';
import IUnit from '../domain/IUnit';

export type ParserResult = { base: BaseUnit[]; customary: CustomaryUnit[] };

export default interface IParser {
  parse(input: string): Promise<ParserResult>;
}
