import { UnitRepository } from '../database/UnitRepository';
import BaseUnit from './BaseUnit';
import CustomaryUnit from './CustomaryUnit';
import IUnit from './IUnit';

const DEFAULT_PARAMETERS = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
};

class UnitFactory {
  public static async loadUnit(unitName: string): Promise<IUnit> {
    const repo = new UnitRepository();
    const unit = await repo.getUnitFromNameOrId(unitName);

    if (unit.baseUnitId && unit.baseUnit !== null) {
      return new CustomaryUnit(
        unit.id,
        unit.name,
        unit.types,
        unit.symbol,
        unit.parameters || DEFAULT_PARAMETERS,
        unit.baseUnit.symbol,
      );
    }
    return new BaseUnit(unit.id, unit.name, unit.types, unit.symbol);
  }
}

export default UnitFactory;
