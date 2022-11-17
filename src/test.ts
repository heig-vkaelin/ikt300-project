import { PrismaClient } from "@prisma/client";
import got from "got";
import { XMLParser } from "fast-xml-parser";

const prisma = new PrismaClient();

async function parseXML() {
  const { body } = await got.get(
    "http://w3.energistics.org/uom/poscUnits22.xml"
  );

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
  });
  const data = parser.parse(body);

  return data.UnitOfMeasureDictionary.UnitsDefinition.UnitOfMeasure;
}

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

  const data = await parseXML();
  const baseUnits = data.filter((unit) => unit.BaseUnit !== undefined);
  const customaryUnits = data.filter((unit) => unit.BaseUnit === undefined);

  console.log(baseUnits.length);
  console.log(customaryUnits.length);
  console.log(customaryUnits[0]);
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
