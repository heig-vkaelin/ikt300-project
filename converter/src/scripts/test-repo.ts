import { UnitRepository } from '../database/UnitRepository';

// TODO: this is a tmp file, don't forget to delete it

async function main() {
  try {
    const repo = new UnitRepository();

    const darcy = await repo.getUnitFromName('darcy');
    // console.log(darcy);

    const units = await repo.listAllUnits();
    // console.log(units);

    const types = await repo.listQuantityClasses();
    // console.log(types);

    const unitsForHeight = await repo.listUnitsForType('height');
    // console.log(unitsForHeight);

    const aliasForMetre = await repo.listAliasForUnit('metre');
    // console.log(aliasForMetre);

    await repo.createSubQuantityClass('running', ['cm', 'dm', 'm', 'mi', 'km']);
  } catch (error) {
    console.error(error);
  }
}

main();
