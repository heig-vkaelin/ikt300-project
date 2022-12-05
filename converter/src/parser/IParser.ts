import BaseUnit from '../domain/BaseUnit';
import CustomaryUnit from '../domain/CustomaryUnit';

export type ParserResult = { base: BaseUnit[]; customary: CustomaryUnit[] };

export default interface IParser {
  parse(input: string): Promise<ParserResult>;
}
