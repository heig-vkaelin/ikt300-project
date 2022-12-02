import IUnit from '../database/IUnit';
import CustomaryUnit from '../database/CustomaryUnit';
import ConversionParameters from '../database/ConversionParameters';
import IParser from './IParser';
import got from 'got';
import { XMLParser } from 'fast-xml-parser';
import { XMLUnit, XMLUnitSchema } from '../validator/XMLUnitValidator';
import QuantityType from '../database/QuantityType';

class ParseXML implements IParser {
  private getFactors(unit: XMLUnit): ConversionParameters {
    let a = 0,
      b = 0,
      c = 0,
      d = 0;

    if (unit.ConversionToBaseUnit.Fraction) {
      b = parseFloat(unit.ConversionToBaseUnit.Fraction.Numerator.toString());
      c = parseFloat(unit.ConversionToBaseUnit.Fraction.Denominator.toString());
    } else if (unit.ConversionToBaseUnit.Factor) {
      b = parseFloat(unit.ConversionToBaseUnit.Factor.toString());
      c = 1;
    } else if (unit.ConversionToBaseUnit.Formula) {
      a = unit.ConversionToBaseUnit.Formula.A;
      b = unit.ConversionToBaseUnit.Formula.B;
      c = unit.ConversionToBaseUnit.Formula.C;
      d = unit.ConversionToBaseUnit.Formula.D;
    }

    return new ConversionParameters(a, b, c, d);
  }

  private parseCustomaryUnit() {}

  public async parse(input: string): Promise<IUnit[]> {
    const { body } = await got.get(input);

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      allowBooleanAttributes: true,
    });
    const data = parser.parse(body);

    const result: IUnit[] = [];
    for (const rawUnit of data.UnitOfMeasureDictionary.UnitsDefinition.UnitOfMeasure) {
      if (rawUnit.BaseUnit !== undefined) {
        // TODO: base unit and not customary unit
        // console.log(unit);
      } else {
        const validation = XMLUnitSchema.safeParse(rawUnit);
        if (validation.success === false) {
          console.error('Error in parsing unit', rawUnit);
          console.error(validation.error);
          continue;
        }
        const { data: unit } = validation;

        const types = unit.QuantityType ?? [];
        const quantityTypes = (Array.isArray(types) ? types : [types]).map(
          (type) => new QuantityType(type),
        );

        const factors = this.getFactors(unit);

        result.push(
          new CustomaryUnit(unit.Name, quantityTypes, unit.CatalogSymbol['#text'], factors),
        );
      }
    }

    return result;
  }
}

export default new ParseXML();
