import CustomaryUnit from '../domain/CustomaryUnit';
import ConversionParameters from '../domain/ConversionParameters';
import IParser, { ParserResult } from './IParser';
import got from 'got';
import { XMLParser } from 'fast-xml-parser';
import {
  XMLBaseUnit,
  XMLBaseUnitSchema,
  XMLCustomaryUnit,
  XMLCustomaryUnitSchema,
} from './XMLUnitValidator';
import QuantityType from '../domain/QuantityType';
import BaseUnit from '../domain/BaseUnit';

class ParserXML implements IParser {
  private getFactors(unit: XMLCustomaryUnit): ConversionParameters {
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

  private getQuantityTypes(unit: XMLBaseUnit): QuantityType[] {
    const types = unit.QuantityType ?? [];
    const quantityTypes = (Array.isArray(types) ? types : [types]).map(
      (type) => new QuantityType(type),
    );
    return quantityTypes.filter((type) => type.name.length > 0);
  }

  private parseBaseUnit(unit: XMLBaseUnit): BaseUnit {
    return new BaseUnit(
      unit.annotation,
      unit.Name,
      this.getQuantityTypes(unit),
      unit.CatalogSymbol['#text'],
    );
  }

  private parseCustomaryUnit(unit: XMLCustomaryUnit): CustomaryUnit {
    return new CustomaryUnit(
      unit.annotation,
      unit.Name,
      this.getQuantityTypes(unit),
      unit.CatalogSymbol['#text'],
      this.getFactors(unit),
      unit.ConversionToBaseUnit.baseUnit,
    );
  }

  public async parse(input: string): Promise<ParserResult> {
    const { body } = await got.get(input);

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      allowBooleanAttributes: true,
    });
    const data = parser.parse(body);

    const result: { base: BaseUnit[]; customary: CustomaryUnit[] } = { base: [], customary: [] };
    for (const rawUnit of data.UnitOfMeasureDictionary.UnitsDefinition.UnitOfMeasure) {
      // Don't parse deprecated units or units without a name
      if (rawUnit.Deprecated || !rawUnit.Name.length) {
        continue;
      }

      // Base unit
      if (rawUnit.BaseUnit !== undefined) {
        const validation = XMLBaseUnitSchema.safeParse(rawUnit);
        if (!validation.success) {
          console.error('Error in parsing base unit', rawUnit, validation.error);
          continue;
        }
        const { data: unit } = validation;
        result.base.push(this.parseBaseUnit(unit));
      }
      // Customary unit
      else {
        const validation = XMLCustomaryUnitSchema.safeParse(rawUnit);
        if (!validation.success) {
          console.error('Error in parsing customary unit', rawUnit, validation.error);
          continue;
        }
        const { data: unit } = validation;
        result.customary.push(this.parseCustomaryUnit(unit));
      }
    }

    return result;
  }
}

export default new ParserXML();
