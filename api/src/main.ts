import express, { Request, Response } from "express";
import dotenv from "dotenv";
import ConverterController from "./converter-controller";

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const converterController = new ConverterController();

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Running");
});
app.get(
  "/api/list-units",
  converterController.listUnits.bind(converterController)
);
app.get(
  "/api/list-quantity-types",
  converterController.listQuantityTypes.bind(converterController)
);
app.get(
  "/api/list-units-for-type",
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
