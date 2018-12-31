import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Fichero } from '../models/fichero';

@Injectable()
export class FicheroService{
	public url: string;
	

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	getFicheros(token, ProyectoId){
			let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
		return this._http.get(this.url+'ficheros/'+ProyectoId,options)
				.pipe(map(res => res));
	}

	addFichero(token, fichero: Fichero){

		let params = JSON.stringify(fichero);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token 
		});
		return this._http.post(this.url+'fichero',params, {headers: headers})
				.pipe(map(res => res));
		
	}
	getFichero(token,id:string){
	let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
		return this._http.get(this.url+'fichero/'+id,options)
				.pipe(map(res => res));

	}
	
	editFichero(token,id,fichero: Fichero){

		let params = JSON.stringify(fichero);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token 
		});
		return this._http.put(this.url+'fichero/'+id,params, {headers: headers})
				.pipe(map(res => res));
		
	}
	deleteFichero(token,id:string){
	let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
		return this._http.delete(this.url+'fichero/'+id,options)
				.pipe(map(res => res));

	}

	
	

}