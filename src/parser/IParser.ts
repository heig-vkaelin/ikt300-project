import IUnit from '../domain/IUnit';

export default interface IParser {
  parse(input: string): Promise<IUnit[]>;
}
