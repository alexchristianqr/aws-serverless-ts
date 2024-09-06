export function resourceIsValid(event: any, path: string) {
  return event.resource === path;
}

export class Mapper {
  /**
   * Convierte el resultado SQL en un objeto mapeado.
   * @param source - Objeto fuente de los datos SQL.
   * @param target - Objeto destino para mapear las propiedades (opcional).
   * @returns El objeto mapeado.
   */
  static sqlResultToObject(source: Record<string, any> = {}, target?: Record<string, any>): Record<string, any> {
    const object: Record<string, any> = {};

    Object.entries(source).forEach(([key, value]) => {
      const property = key
        .toLowerCase()
        .split("_")
        .map(part => part.replace(/(-\w)/g, c => c.charAt(1).toUpperCase()));
      this.setPropertyValue(object, property, value);
    });

    return target ? this.copyObjectProperties(object, target) : object;
  }

  /**
   * Copia las propiedades de un objeto a otro.
   * @param source - Objeto fuente de datos.
   * @param target - Objeto destino.
   * @returns El objeto destino con las propiedades copiadas.
   */
  static copyObjectProperties(source: Record<string, any> = {}, target: Record<string, any> = {}): Record<string, any> {
    return Object.keys(target).reduce((acc, key) => {
      acc[key] = source[key];
      return acc;
    }, { ...target });
  }

  /**
   * Establece el valor de una propiedad en un objeto.
   * @param object - El objeto en el que se establecerá el valor.
   * @param property - Array de claves que definen la propiedad.
   * @param value - El valor a establecer.
   * @returns El objeto actualizado.
   */
  static setPropertyValue(object: Record<string, any> = {}, property: string[] = [], value: any): any {
    return property.reduce((acc, key, index) => {
      if (typeof acc[key] === 'undefined' && index !== property.length - 1) {
        acc[key] = {};
      }

      if (index === property.length - 1) {
        acc[key] = value;
      }

      return acc[key];
    }, object);
  }
}
