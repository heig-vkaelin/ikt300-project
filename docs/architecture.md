# Architecture


## Units

```plantuml
interface IUnit {
    name: string
    types: QuantityType[]
    symbol: string
    + convertToBase(value: number): number
    + convertFromBase(value: number): number
}

class Conversion {
    A: number
    B: number
    C: number
    D: number
}

class BaseUnit {
    description: string
}

class CustomaryUnit {
    baseUnit: BaseUnit
    conversion: Conversion
}
class QuantityType {
    name: string
}

BaseUnit --|> IUnit
CustomaryUnit --|> IUnit
CustomaryUnit -RIGHT-> BaseUnit
Conversion --> CustomaryUnit
IUnit "*" --> "*" QuantityType
```

- Is a type `BaseUnit` really necessary? Could BaseUnits also be CustomaryUnits?

## Conversion

```plantuml
interface IUnit {
    name: string
    types: QuantityType[]
    symbol: string
    + convertToBase(value: number): number
    + convertFromBase(value: number): number
}

class UnitLoader {
  {static} loadUnits(): IUnit[]
}

class Converter {
    + ConvertUnit(a: IUnit, value: number, b: IUnit): number
}

IUnit <-- Converter
UnitLoader <-- Converter
```

```ts
class Converter {
    public ConvertValue(a: IUnit, value: number, b: IUnit): number {
        // Validation if both units have the same base
        // What if one of the units is a base unit?

        const baseValue = a.convertToBase(value);
        const convertedValue = b.convertFromBase(baseValue);

        return convertedValue;
    }
}

```


## Conversion from and to base
```ts
function ConvertToBase(a: IUnit, value: number): number {
    const {a,b,c,d} = a.conversion
    return (a+b*value)/(c+d*value)
}

function ConvertFromBase(b: IUnit, value: number): number {
    const {a,b,c,d} = b.conversion
    return (-a + c * value) / (b - d * value);
}
```