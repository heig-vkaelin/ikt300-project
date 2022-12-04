import { PrismaClient } from '@prisma/client';
import CustomaryUnit from './database/CustomaryUnit';
import IUnit from './database/IUnit';
import ParserXML from './parser/ParserXML';

const prisma = new PrismaClient();

async function deleteAll() {
  await prisma.unit.deleteMany();
  await prisma.quantityType.deleteMany();
}

function findDuplicates(units: CustomaryUnit[]) {
  const names = units.map((unit) => unit.name);
  const set = new Set(names);
  const duplicates = names.filter((item) => !set.delete(item));
  return duplicates;
}

async function saveToDB() {
  const units = await ParserXML.parse('http://w3.energistics.org/uom/poscUnits22.xml');
  console.log(units.length + ' units parsed');
  // console.log(units[0]);

  // TODO: what do we do with duplicates?
  // console.log(findDuplicates(units));

  console.log('Saving to db...');
  for (const unit of units) {
    const createUnitAndTypes = await prisma.unit
      .create({
        data: {
          name: unit.name,
          symbol: unit.symbol,
          types: {
            connectOrCreate: unit.types.map((type) => {
              return {
                where: { name: type.name },
                create: { name: type.name },
              };
            }),
          },
          a: unit.parameters.a,
          b: unit.parameters.b,
          c: unit.parameters.c,
          d: unit.parameters.d,
        },
      })
      .catch((e) => {
        console.log('Error while saving unit in db');
        // console.log(e);
      });
  }
  console.log('Done!');
}

async function main() {
  // await deleteAll();
  await saveToDB();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
