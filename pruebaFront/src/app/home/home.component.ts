import { Component, OnInit } from '@angular/core';
import { ModelReportService } from 'src/core/services/modelreport.service';
import { ModelReport, ListaDos } from 'src/core/model';
import { HttpResponse } from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modelReport : ModelReport;
  listaModelReport : Array<ModelReport>;
  campo_uno : any;
  campo_dos : any;
  error : string;

  listaCamposUno : SelectItem[];
  listaCamposDos : SelectItem[];
  mostrarCampoDos : boolean;
  

  constructor(private _modelReportService:ModelReportService) { 
    this.listaCamposUno = [
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'},
      {label: '4', value: '4'}
    ]
    this.modelReport = new ModelReport();
  }

  /**
   * inicializa la lista de campos 2
   */

  ngOnInit() {
    this.cargarListaCamposDos();
  }

  /**
   * valida si debe mostrar la lista de campos 2 dependiento la seleccion del campo 1, 
   * la cual debe ser 1 para mosntrar la lista
   */
  validarCamposDos(){
    
    if(this.campo_uno.value == '1'){
      this.mostrarCampoDos =  true;
      this.campo_dos = '' ;
    }else{
      this.mostrarCampoDos =  false;
      this.campo_dos = '' ;
    }
    
  }

  /**
   * @description petición al backend para cargar las opciones de los campos 2
   */

  async cargarListaCamposDos() {
    let resultado = await this._modelReportService.obtenerListaDos();
    resultado.subscribe((resultado: [ListaDos]) => {
      this.listaCamposDos = resultado as Array<ListaDos>;
    });
  }

  /**
   *  @description petición al backend para carga todos los reportes existentes en la BD
   */
  cargarModelReport(){
    let resultado =  this._modelReportService.obtenerModel();
    resultado.subscribe((resultado: ModelReport[]) => {
      this.listaModelReport = resultado as Array<ModelReport>;
      console.log('reporte: ' , this.listaModelReport)
    });
  }

  /**
   * @description crea un registro en la BD, valida el resultado , muestra mensaje si existe error.
   */

  guardarModelReport(){
    console.log('crear reporte: ')
    if(this.campo_uno){
      this.modelReport.campo_uno = this.campo_uno.value;
    }else{
      this.modelReport.campo_uno = "";
    }
    if(this.campo_dos){
      this.modelReport.campo_dos = this.campo_dos.value;
    }else{
      this.modelReport.campo_dos = "";
    }
    this._modelReportService.crearModel(this.modelReport).subscribe((res: HttpResponse<Object>) => {
      let respuesta: any = res;
      console.log('respuesta' , res)
      if(respuesta.creacion){
        this.cargarModelReport();
        this.modelReport = new ModelReport();
        this.mostrarCampoDos = false;
        this.campo_uno = '';
        this.campo_dos = '';
        this.error = '';
      }else{
        this.error = respuesta.errores[0];
      }
      
    });
  }

}
