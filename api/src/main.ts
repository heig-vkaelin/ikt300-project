import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import ConverterController from "./converter-controller";

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const errorWrapper =
  (controllerMethod: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerMethod(req, res, next);
    } catch (e: any) {
      console.error(e);
      res.status(500).send({ message: e.message });
    }
  };

const converterController = new ConverterController();

const app = express();
app.use(express.json());
app.get("/", (_, res: Response) => {
  res.send("Running");
});
app.get(
  "/api/list-units",
  errorWrapper(converterController.listUnits.bind(converterController))
);
app.get(
  "/api/list-quantity-types",
  errorWrapper(converterController.listQuantityTypes.bind(converterController))
);
app.get(
  "/api/list-units-for-type",
  errorWrapper(converterController.listUnitsForType.bind(converterController))
);
app.get(
  "/api/list-alias-for-unit",
  errorWrapper(converterController.listAliasForUnit.bind(converterController))
);
app.get(
  "/api/convert",
  errorWrapper(converterController.convertUnit.bind(converterController))
);
app.post(
  "/api/create-sub-quantity",
  errorWrapper(
    converterController.createSubQuantityClass.bind(converterController)
  )
);

app.listen(process.env.PORT);

console.log(`Started at http://localhost:${process.env.PORT}`);
