import { UnitRepository } from '../database/UnitRepository';

// TODO: this is a tmp file, don't forget to delete it

async function main() {
  try {
    const repo = new UnitRepository();

    const darcy = await repo.getUnitFromNameOrId('darcy');
    const darcyV2 = await repo.getUnitFromNameOrId('D');
    // console.log(darcy);
    // console.log(darcyV2);

    const units = await repo.listAllUnits();
    // console.log(units);

    const types = await repo.listQuantityTypes();
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
