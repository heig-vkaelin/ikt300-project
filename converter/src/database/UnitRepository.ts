import prisma from '../database/Client';
import { Unit } from '@prisma/client';

class UnitRepository {
  public static async getUnitFromName(name: string): Promise<Unit> {
    const unit = await prisma.unit.findFirstOrThrow({
      where: {
        name: name,
      },
      include: {
        aliases: true,
        types: true,
        parameters: true,
        baseUnit: true,
        units: true,
      },
    });
    return unit;
  }
  public static async listAllUnits(): Promise<string[]> {
    const units = await prisma.unit.findMany({
      select: {
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return units.map((unit) => unit.name);
  }

  public static async listQuantityClasses(): Promise<string[]> {
    const types = await prisma.quantityType.findMany({
      select: {
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return types.map((type) => type.name);
  }

  public static async listUnitsForType(type: string): Promise<string[]> {
    const units = await prisma.unit.findMany({
      select: {
        name: true,
      },
      where: {
        types: {
          some: {
            name: type,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return units.map((unit) => unit.name);
  }

  public static async listAliasForUnit(name: string): Promise<string[]> {
    const unit = await prisma.unit.findFirstOrThrow({
      where: {
        name: name,
      },
      include: {
        aliases: true,
      },
    });
    return unit.aliases.map((alias) => alias.name);
  }

  // TODO: update this because for now it's quite shit
  public static async createSubQuantityClass(className: string, units: string[]): Promise<void> {
    await prisma.quantityType.upsert({
      where: { name: className },
      update: {},
      create: {
        name: className,
        units: {
          connect: units.map((unit) => {
            return { id: unit };
          }),
        },
      },
    });
  }
}

export default UnitRepository;
