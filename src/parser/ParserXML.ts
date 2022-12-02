import IUnit from '../database/IUnit';
import CustomaryUnit from '../database/CustomaryUnit';
import ConversionParameters from '../database/ConversionParameters';
import IParser from './IParser';
import got from 'got';
import { XMLParser } from 'fast-xml-parser';

class ParseXML implements IParser {
  private getFactors(unit: any): ConversionParameters {
    let a = 0,
      b = 0,
      c = 0,
      d = 0;

    if (unit.ConversionToBaseUnit.Fraction) {
      b = unit.ConversionToBaseUnit.Fraction.Numerator;
      c = unit.ConversionToBaseUnit.Fraction.Denominator;
    } else if (unit.ConversionToBaseUnit.Factor) {
      b = unit.ConversionToBaseUnit.Factor;
      c = 1;
    } else if (unit.ConversionToBaseUnit.Formula) {
      a = unit.ConversionToBaseUnit.Formula.A;
      b = unit.ConversionToBaseUnit.Formula.B;
      c = unit.ConversionToBaseUnit.Formula.C;
      d = unit.ConversionToBaseUnit.Formula.D;
    }

    return new ConversionParameters(a, b, c, d);
  }

  public async parse(input: string): Promise<IUnit[]> {
    const { body } = await got.get(input);

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      allowBooleanAttributes: true,
    });
    const data = parser.parse(body);

    const result: IUnit[] = [];

    for (const unit of data.UnitOfMeasureDictionary.UnitsDefinition.UnitOfMeasure) {
      if (unit.BaseUnit !== undefined) {
        // TODO: base unit and not customary unit
      } else {
        const factors = this.getFactors(unit);

        result.push(
          new CustomaryUnit(unit.Name, unit.QuantityType, unit.CatalogSymbol['#text'], factors),
        );
      }
    }

    return result;
  }
}

export default new ParseXML();
