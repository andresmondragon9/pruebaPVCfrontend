import { Component, OnInit } from '@angular/core';
import { ModelReportService } from 'src/core/services/modelreport.service';
import { Persona, Pais , TipoDocumento } from 'src/core/model';
import { HttpResponse } from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  persona : Persona;
  listaPersonas : Array<Persona>;
  tipoDocumentoSeleccionado : TipoDocumento;
  paisSeleccionado : Pais;
  error : string;

  listaDocumentos : Array<TipoDocumento>;
  listaPais : Array<Pais>;
  mostrarCampoDos : boolean;
  

  constructor(private _modelReportService:ModelReportService) { 
    this.persona = new Persona();
  }

  /**
   * inicializa la lista de campos 2
   */

  ngOnInit() {
    this.cargarTiposDocumentos();
    this.cargarPaises();
    this.cargarModelReport();
  }

  /**
   * @description petición al backend para cargar tipos de documentos
   */

  async cargarTiposDocumentos() {
    let resultado = await this._modelReportService.obtenerTiposDocumentos();
    resultado.subscribe((resultado: [TipoDocumento]) => {
      this.listaDocumentos = resultado as Array<TipoDocumento>;
    });
  }

  /**
   * @description petición al backend para cargar paises
   */

  async cargarPaises() {
    let resultado = await this._modelReportService.obtenerPaises();
    resultado.subscribe((resultado: [Pais]) => {
      this.listaPais = resultado as Array<Pais>;
    });
  }

  /**
   *  @description petición al backend para carga todos las personas de la BD
   */
  cargarModelReport(){
    let resultado =  this._modelReportService.obtenerPersonas();
    resultado.subscribe((resultado: Persona[]) => {
      this.listaPersonas = resultado as Array<Persona>;
      console.log('reporte: ' , this.listaPersonas)
    });
  }

  /**
   * @description crea un registro en la BD.
   */

  guardarPersona(){
    this.persona.idPais = this.paisSeleccionado;
    this.persona.idTipoDocumento = this.tipoDocumentoSeleccionado;
  
    this._modelReportService.crearPersona(this.persona).subscribe((res: HttpResponse<Object>) => {
      let respuesta: any = res;
      console.log('respuesta' , respuesta)
      this.cargarModelReport();  
    });
  }

  /**
   * @description elimina un persona de la bd
   */
  eliminarPersona(idPersona : number){
    this._modelReportService.eliminarPersona(idPersona).subscribe((res: HttpResponse<Object>) => {
      let respuesta: any = res;
      console.log('respuesta' , respuesta)
      this.cargarModelReport();  
    });
  }

}
