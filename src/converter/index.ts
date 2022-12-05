import IUnit from '../domain/IUnit';
import UnitLoader from '../domain/UnitLoader';
import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

const program = async () => {
  const units = UnitLoader.loadUnits();

  const rl = readline.createInterface(input, output);
  const type1Symbol = await rl.question('Enter the source type (e.g. m/s): ');
  const valueString = await rl.question('Enter the value: ');
  const type2Symbol = await rl.question('Enter the target type (e.g. m/s): ');

  const value = parseFloat(valueString);
  const a = units.find((u) => u.symbol === type1Symbol);
  const b = units.find((u) => u.symbol === type2Symbol);

  if (!a || !b) {
    console.log('Not a supported type');
    return;
  }

  const convertedValue = convert(a, value, b);
  console.log(convertedValue);
  exit(0);
};

function convert(a: IUnit, value: number, b: IUnit) {
  const baseValue = a.convertToBase(value);
  const convertedValue = b.convertFromBase(baseValue);

  return convertedValue;
}

program();
