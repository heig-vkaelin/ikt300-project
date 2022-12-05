import { Request, Response } from "express";
import { UnitRepository, Converter } from "engineering-unit-converter";

export default class ConverterController {
  public static async listUnitDimensions(req: Request, res: Response) {
    const list = await UnitRepository.listAllUnits();
    res.send(list);
  }

  public static async listQuantityClass(req: Request, res: Response) {
    const list = await UnitRepository.listQuantityClasses();
    res.send(list);
  }

  public static async listUnitsForType(req: Request, res: Response) {
    const type = req.query.type?.toString() || "";
    const list = await UnitRepository.listUnitsForType(type);
    res.send(list);
  }

  public static async listAliasForUnit(req: Request, res: Response) {
    const unit = req.query.unit?.toString() || "";
    const list = await UnitRepository.listAliasForUnit(unit);
    res.send(list);
  }

  public static async convertUnit(req: Request, res: Response) {
    const unitA = req.query.unitA?.toString() || "";
    const unitB = req.query.unitB?.toString() || "";
    const valueString = req.query.value?.toString() || "";
    const value = parseFloat(valueString);

    const converter = new Converter();
    const result = await converter.convert(unitA, unitB, value);

    res.send({ result });
  }
  public static async createSubQuantityClass(req: Request, res: Response) {
    const name = req.body.name?.toString() || "";
    const parent = req.body.parent?.toString() || "";
    await UnitRepository.createSubQuantityClass(parent, name);

    res.sendStatus(200);
  }
}
