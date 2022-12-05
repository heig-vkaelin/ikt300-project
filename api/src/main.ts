import express, { Request, Response } from "express";
import dotenv from "dotenv";
import ConverterController from "./converter-controller";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Running");
});
app.get("/api/list-dimensions", ConverterController.listUnitDimensions);
app.get("/api/list-quantity-class", ConverterController.listQuantityClass);
app.get("/api/list-unity-for-type", ConverterController.listUnitsForType);
app.get("/api/list-alias-for-unit", ConverterController.listAliasForUnit);
app.get("/api/convert", ConverterController.convertUnit);
app.post(
  "/api/create-sub-quantity",
  ConverterController.createSubQuantityClass
);

app.listen(process.env.PORT);

console.log(`Started at http://localhost:${process.env.PORT}`);
