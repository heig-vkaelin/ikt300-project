import UnitFactory from '../domain/UnitFactory';
import { ConversionResult } from './ConversionResult';

export class Converter {
  public async convert(unitNameA: string, unitNameB: string, value: number) {
    if (isNaN(value)) {
      throw new Error('Value is not a number.');
    }

    const unitA = await UnitFactory.loadUnit(unitNameA);
    const unitB = await UnitFactory.loadUnit(unitNameB);

    if (unitA.baseUnit !== unitB.baseUnit) {
      throw new Error(
        `Base unit doesn't match: [${unitA.name}] not compatible with [${unitB.name}].`,
      );
    }

    const baseValue = unitA.convertToBase(value);
    const convertedValue = unitB.convertFromBase(baseValue);

    return new ConversionResult(unitA, unitB, value, convertedValue);
  }
}
