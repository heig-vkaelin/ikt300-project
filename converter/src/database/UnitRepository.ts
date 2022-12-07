import prisma from '../database/Client';

export class UnitRepository {
  public async getUnitFromNameOrId(value: string) {
    const unit = await prisma.unit.findFirstOrThrow({
      where: {
        OR: [{ name: value }, { id: value }, { symbol: value }],
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
  public async listAllUnits(): Promise<string[]> {
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

  public async listQuantityClasses(): Promise<string[]> {
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

  public async listUnitsForType(type: string): Promise<string[]> {
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

  public async listAliasForUnit(name: string): Promise<string[]> {
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

  public async createSubQuantityClass(className: string, unitIds: string[]): Promise<void> {
    // Check that all classes have the same quantity type
    const units = await Promise.all(unitIds.map((id) => this.getUnitFromNameOrId(id)));
    const allTypes = [units.map((unit) => unit.types.map((type) => type.name))].flat();
    const intersection = allTypes.reduce((a, b) => a.filter((c) => b.includes(c)));

    if (intersection.length < 1) {
      throw new Error('All units must have the same quantity type to create a sub quantity class.');
    }

    await prisma.quantityType.upsert({
      where: { name: className },
      update: {},
      create: {
        name: className,
        units: {
          connect: units.map((unit) => {
            return { id: unit.id };
          }),
        },
      },
    });
  }
}
