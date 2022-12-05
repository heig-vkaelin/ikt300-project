import IUnit from './IUnit';
import UnitLoader from './UnitLoader';

class UnitFactory {
  public static loadUnit(unitName: string): IUnit {
    const units = UnitLoader.loadUnits();
    const unit = units.find((u) => u.symbol === unitName);

    if (!unit) {
      throw new Error(`Could not find unit with name: ${unitName}`);
    }

    return unit;
  }
}

export default UnitFactory;
