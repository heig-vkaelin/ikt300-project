import { Request, Response } from 'express';

export default class ConverterController {
  public static listUnitDimensions(req: Request, res: Response) {
    res.send([]);
  }

  public static listQuantityClass(req: Request, res: Response) {
    res.send([]);
  }

  public static listQuantityClassForUnit(req: Request, res: Response) {
    const body = JSON.parse(req.body);
    const unit = body['unit'];

    res.send([]);
  }

  public static listAliasForUnit(req: Request, res: Response) {
    const body = JSON.parse(req.body);
    const unit = body['unit'];

    res.send([]);
  }
  public static convertUnit(req: Request, res: Response) {
    const body = JSON.parse(req.body);
    const unitA = body['unitA'];
    const unitB = body['unitB'];
    const value = body['value'];

    res.send({});
  }
  public static createSubQuantityClass(req: Request, res: Response) {
    const body = JSON.parse(req.body);
    const parent = body['parent'];
    const name = body['name'];

    res.sendStatus(200);
  }
}
