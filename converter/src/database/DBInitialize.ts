import { ParserResult } from '../parser/IParser';
import prisma from './Client';

class DBInitialize {
  public static async deleteAll() {
    await prisma.unit.deleteMany();
    await prisma.conversionParameters.deleteMany();
    await prisma.unitAlias.deleteMany();
    await prisma.quantityType.deleteMany();
  }
  public static async saveToDB(parsedData: ParserResult) {
    console.log('Saving base to db...');
    for (const unit of parsedData.base) {
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
    for (const unit of parsedData.customary) {
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
}

export default DBInitialize;
