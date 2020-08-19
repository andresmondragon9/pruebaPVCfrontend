import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {ModelReport} from '../model';
import { dominio } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ModelReportService {

    constructor(private http: HttpClient) {
           
     }

    /**
     * @description llamado POST al Banckend para guardar un registro en la BD
     * @param modelResport 
     */
    crearModel(modelResport : ModelReport) {
        console.log('crear reporte: ', JSON.stringify(modelResport));
        return this.http.post<HttpResponse<Object>>(dominio + "/report", JSON.stringify(modelResport),{
            headers: {'Content-Type': 'application/json'}
        });
    }

    /**
     * @description metodo GET para obtener todos los registros 
     */
    obtenerModel(){
        return this.http.get(dominio + "/report");
    }

    /**
     * @description metodo GET para obtener la lista de campos 2
     */

    obtenerListaDos(){
        return this.http.get(dominio + "/listaDos");
    }
}