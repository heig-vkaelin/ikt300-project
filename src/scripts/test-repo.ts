import UnitRepository from '../database/UnitRepository';

// TODO: this is a tmp file, don't forget to delete it

async function main() {
  try {
    const darcy = await UnitRepository.getUnitFromName('darcy');
    // console.log(darcy);

    const units = await UnitRepository.listAllUnits();
    // console.log(units);

    const types = await UnitRepository.listQuantityClasses();
    // console.log(types);

    const unitsForHeight = await UnitRepository.listUnitsForType('height');
    // console.log(unitsForHeight);

    const aliasForMetre = await UnitRepository.listAliasForUnit('metre');
    console.log(aliasForMetre);
  } catch (error) {
    console.error(error);
  }
}

main();
