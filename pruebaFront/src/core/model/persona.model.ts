import {  Pais , TipoDocumento } from 'src/core/model';

export class Persona {
  public id: number;
  public nombres: string;
  public apellidos: string;
  public edad: string;
  public numeroDocumento: string;
  public idTipoDocumento: TipoDocumento;
  public idPais: Pais;
  public genero: string;
}