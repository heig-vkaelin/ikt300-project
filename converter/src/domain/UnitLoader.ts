import ConversionParameters from './ConversionParameters';
import CustomaryUnit from './CustomaryUnit';
import IUnit from './IUnit';

class UnitLoader {
  public static loadUnits(): IUnit[] {
    const km_s = new CustomaryUnit(
      'km/s',
      'kilometer per second',
      [],
      'km/s',
      new ConversionParameters(0, 1000, 1, 0),
      'km',
    );
    const km_h = new CustomaryUnit(
      'km/h',
      'kilometer per hour',
      [],
      'km/h',
      new ConversionParameters(0, 1, 3.6, 0),
      'km',
    );
    const kft_h = new CustomaryUnit(
      'kft/h',
      'thousand feet per hour',
      [],
      'kft/h',
      new ConversionParameters(0, 304.8, 3600, 0),
      'km',
    );

    return [km_s, km_h, kft_h];
  }
}

export default UnitLoader;
