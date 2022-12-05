import { z } from 'zod';

export const XMLBaseUnitSchema = z.object({
  Name: z.string(),
  QuantityType: z.optional(z.array(z.string()).or(z.string())),
  annotation: z.string(),
  CatalogSymbol: z.object({
    '#text': z.string(),
  }),
});

export const XMLCustomaryUnitSchema = XMLBaseUnitSchema.extend({
  ConversionToBaseUnit: z.object({
    baseUnit: z.string(),
    Fraction: z.optional(
      z.object({
        Numerator: z.number().or(z.string()),
        Denominator: z.number().or(z.string()),
      }),
    ),
    Factor: z.optional(z.number().or(z.string())),
    Formula: z.optional(
      z.object({
        A: z.number(),
        B: z.number(),

        C: z.number(),
        D: z.number(),
      }),
    ),
  }),
});

export type XMLBaseUnit = z.infer<typeof XMLBaseUnitSchema>;
export type XMLCustomaryUnit = z.infer<typeof XMLCustomaryUnitSchema>;
