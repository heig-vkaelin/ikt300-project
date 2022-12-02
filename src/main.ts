import { PrismaClient } from '@prisma/client';
import ParserXML from './parser/ParserXML';

const prisma = new PrismaClient();

async function main() {
  // const quantityType = await prisma.quantityType.create({
  //   data: {
  //     name: "mass",
  //     units: {
  //       create: [
  //         {
  //           name: "kilogram",
  //         },
  //         {
  //           name: "attogram",
  //         },
  //       ],
  //     },
  //   },
  // });
  // const quantityType = await prisma.quantityType.findMany();
  // console.log(quantityType);

  const units = await ParserXML.parse('http://w3.energistics.org/uom/poscUnits22.xml');

  console.log(units.length);
  console.log(units[0]);
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
