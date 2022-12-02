import { z } from 'zod';

export const XMLUnitSchema = z.object({
  Name: z.string(),
  QuantityType: z.optional(z.array(z.string()).or(z.string())),
  CatalogSymbol: z.object({
    '#text': z.string(),
  }),
  ConversionToBaseUnit: z.object({
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

export type XMLUnit = z.infer<typeof XMLUnitSchema>;
