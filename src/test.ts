import { PrismaClient } from "@prisma/client";

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

  const quantityType = await prisma.quantityType.findMany();

  console.log(quantityType);
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
