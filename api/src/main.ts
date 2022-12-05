import express, { Request, Response } from 'express';
import ConverterController from './converter-controller';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Running');
});

app.get('/api/list-dimensions', ConverterController.listUnitDimensions);
app.get('/api/list-quantity-class', ConverterController.listQuantityClass);
app.get('/api/list-quantity-class-for-unit', ConverterController.listQuantityClassForUnit);
app.get('/api/list-alias-for-unit', ConverterController.listAliasForUnit);
app.get('/api/convert', ConverterController.convertUnit);
app.post('/api/create-sub-quantity', ConverterController.createSubQuantityClass);

app.listen(3000);

console.log('Started at http://localhost:3000')