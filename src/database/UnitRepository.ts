import IUnit from '../domain/IUnit';

export class UnitRepository {
  getUnitFromname(name: string): IUnit {
    throw 'Not implemented yet';
  }
  listUnitDimension(): string[] {
    return [];
  }

  listQuanitytClasses(): string[] {
    return [];
  }

  listQuantityClassForUnit(unit: string): string[] {
    return [];
  }

  listAliasForUnit(unit: string): string[] {
    return [];
  }

  createSubQuantityClass(parent: string, className: string): void {
    return;
  }
}
