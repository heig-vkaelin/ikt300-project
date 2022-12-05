import UnitFactory from '../domain/UnitFactory';

export class Converter {
  public async convert(unitNameA: string, unitNameB: string, value: number) {
    const unitA = await UnitFactory.loadUnit(unitNameA);
    const unitB = await UnitFactory.loadUnit(unitNameB);

    const baseValue = unitA.convertToBase(value);
    const convertedValue = unitB.convertFromBase(baseValue);

    return convertedValue;
  }
}
