import { PrismaClient } from '@prisma/client';
import IUnit from './domain/IUnit';
import ParserXML from './parser/ParserXML';

const prisma = new PrismaClient();

async function deleteAll() {
  await prisma.unit.deleteMany();
  await prisma.conversionParameters.deleteMany();
  await prisma.unitAlias.deleteMany();
  await prisma.quantityType.deleteMany();
}

function findDuplicates(units: IUnit[]) {
  const names = units.map((unit) => unit.name);
  const set = new Set(names);
  const duplicates = names.filter((item) => !set.delete(item));
  return duplicates;
}

async function saveToDB() {
  const result = await ParserXML.parse('http://w3.energistics.org/uom/poscUnits22.xml');
  console.log(result.base.length + ' base units parsed');
  console.log(result.customary.length + ' customary units parsed');
  console.log(result.base[0]);

  // TODO: we delete all for now everytime
  await deleteAll();

  // console.log(findDuplicates(result.base));
  // console.log(findDuplicates(result.customary));

  console.log('Saving base to db...');
  for (const unit of result.base) {
    await prisma.unit
      .create({
        data: {
          id: unit.id,
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
        },
      })
      .catch((e) => {
        console.log('Error while saving base unit in db');
        console.log(e);
        console.log(unit);
      });
  }
  console.log('Done!');

  console.log('Saving customary to db...');
  for (const unit of result.customary) {
    await prisma.unit
      .create({
        data: {
          id: unit.id,
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
          baseUnit: {
            connect: {
              id: unit.baseUnit,
            },
          },
          parameters: {
            create: {
              a: unit.parameters.a,
              b: unit.parameters.b,
              c: unit.parameters.c,
              d: unit.parameters.d,
            },
          },
        },
      })
      .catch((e) => {
        console.log('Error while saving customary unit in db');
        console.log(e);
        console.log(unit);
      });
  }
  console.log('Done!');
}

async function main() {
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
