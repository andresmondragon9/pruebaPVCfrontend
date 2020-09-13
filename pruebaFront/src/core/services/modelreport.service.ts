import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Persona} from '../model';
import { dominio } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ModelReportService {

    constructor(private http: HttpClient) {
           
     }

    /**
     * @description metodo GET para obtener todos las personas
     */
    obtenerPersonas(){
        return this.http.get(dominio + "/obtener/personas");
    }

    /**
     * @description metodo GET para obtener la lista de Documentos
     */

    obtenerTiposDocumentos(){
        return this.http.get(dominio + "/obtener/tipodocumentos", {
            headers: {'Content-Type': 'application/json'}
        });
    }

    /**
     * @description metodo GET para obtener la lista de Paises
     */

    obtenerPaises(){
        return this.http.get(dominio + "/obtener/paises");
    }

    /**
     * @description medoto DELETE para eleminar persona de la BD
     */
    eliminarPersona(idPersona : number){
        console.log(idPersona)
        return this.http.delete(dominio + "/eliminar/persona/" + idPersona);
    }

     /**
     * @description llamado POST al Banckend para crear una persona  en la BD
     * @param modelResport 
     */
    crearPersona(persona : Persona) {
        console.log('crear Persona: ', JSON.stringify(persona));
        return this.http.post<HttpResponse<Object>>(dominio + "/crear/persona", JSON.stringify(persona),{
            headers: {'Content-Type': 'application/json'}
        });
    }
}