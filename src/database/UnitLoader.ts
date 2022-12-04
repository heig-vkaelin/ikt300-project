import ConversionParameters from './ConversionParameters';
import CustomaryUnit from './CustomaryUnit';

class UnitLoader {
  public static loadUnits(): CustomaryUnit[] {
    const km_s = new CustomaryUnit(
      'kilometer per second',
      [],
      'km/s',
      new ConversionParameters(0, 1000, 1, 0),
    );
    const km_h = new CustomaryUnit(
      'kilometer per hour',
      [],
      'km/h',
      new ConversionParameters(0, 1, 3.6, 0),
    );
    const kft_h = new CustomaryUnit(
      'thousand feet per hour',
      [],
      'kft/h',
      new ConversionParameters(0, 304.8, 3600, 0),
    );

    return [km_s, km_h, kft_h];
  }
}

export default UnitLoader;
