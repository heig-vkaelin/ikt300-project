import IUnit from '../database/IUnit';

export default interface IParser {
  parse(input: string): Promise<IUnit[]>;
}
