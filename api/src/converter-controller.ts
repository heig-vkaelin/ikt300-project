import { Request, Response } from "express";
import { UnitRepository, Converter } from "engineering-unit-converter";

export default class ConverterController {
  private readonly _repo: UnitRepository;
  private readonly _converter: Converter;

  constructor() {
    this._repo = new UnitRepository();
    this._converter = new Converter();
  }

  public async listUnits(req: Request, res: Response) {
    const list = await this._repo.listAllUnits();
    res.send(list);
  }

  public async listQuantityTypes(req: Request, res: Response) {
    const list = await this._repo.listQuantityTypes();
    res.send(list);
  }

  public async listUnitsForType(req: Request, res: Response) {
    const type = req.query.type?.toString() || "";
    const list = await this._repo.listUnitsForType(type);
    res.send(list);
  }

  public async listAliasForUnit(req: Request, res: Response) {
    const unit = req.query.unit?.toString() || "";
    const list = await this._repo.listAliasForUnit(unit);
    res.send(list);
  }

  public async convertUnit(req: Request, res: Response) {
    const unitA = req.query.unitA?.toString() || "";
    const unitB = req.query.unitB?.toString() || "";
    const valueString = req.query.value?.toString() || "";
    const value = parseFloat(valueString);

    const result = await this._converter.convert(unitA, unitB, value);

    res.send({ result });
  }
  public async createSubQuantityClass(req: Request, res: Response) {
    const className = req.body.className;
    const unitIds = req.body.unitIds;
    await this._repo.createSubQuantityClass(className, unitIds);

    res.sendStatus(200);
  }
}
