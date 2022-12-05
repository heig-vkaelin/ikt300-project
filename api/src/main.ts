import express, { Request, Response } from "express";
import dotenv from "dotenv";
import ConverterController from "./converter-controller";

dotenv.config();

const converterController = new ConverterController();

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Running");
});
app.get(
  "/api/list-dimensions",
  converterController.listUnitDimensions.bind(converterController)
);
app.get(
  "/api/list-quantity-class",
  converterController.listQuantityClass.bind(converterController)
);
app.get(
  "/api/list-unity-for-type",
  converterController.listUnitsForType.bind(converterController)
);
app.get(
  "/api/list-alias-for-unit",
  converterController.listAliasForUnit.bind(converterController)
);
app.get(
  "/api/convert",
  converterController.convertUnit.bind(converterController)
);
app.post(
  "/api/create-sub-quantity",
  converterController.createSubQuantityClass.bind(converterController)
);

app.listen(process.env.PORT);

console.log(`Started at http://localhost:${process.env.PORT}`);
