import DBInitialize from '../database/DBInitialize';
import IUnit from '../domain/IUnit';
import ParserXML from '../parser/ParserXML';

// TODO: remove when not used anymore
function findDuplicates(units: IUnit[]) {
  const names = units.map((unit) => unit.name);
  const set = new Set(names);
  const duplicates = names.filter((item) => !set.delete(item));
  return duplicates;
}

async function main() {
  const parser = new ParserXML();
  const result = await parser.parse('http://w3.energistics.org/uom/poscUnits22.xml');
  console.log(result.base.length + ' base units parsed');
  console.log(result.customary.length + ' customary units parsed');
  await DBInitialize.saveToDB(result);
}

main();
