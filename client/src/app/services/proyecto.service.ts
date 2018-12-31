import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Proyecto } from '../models/proyecto';

@Injectable()
export class ProyectoService{
	public url: string;
	

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	getProyecto(token, id: string){
		let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
	
		return this._http.get(this.url+'proyecto/'+id,options)
		.pipe(map(res => res));
	}

	addProyecto(token, proyecto: Proyecto){

		let params = JSON.stringify(proyecto);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token 
		});
		return this._http.post(this.url+'proyecto',params, {headers: headers})
				.pipe(map(res => res));
		
	}
	
	editProyecto(token, id: string,proyecto: Proyecto){

		let params = JSON.stringify(proyecto);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token 
		});
		return this._http.put(this.url+'proyecto/'+id, params, {headers: headers})
				.pipe(map(res => res));
		
	}
	getProyectos(token, page){
		let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
	
		return this._http.get(this.url+'proyectos/'+page, options)
				.pipe(map(res => res));
	}
	deleteProyecto(token, id: string){
		let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
	
		return this._http.delete(this.url+'proyecto/'+id, options)
		.pipe(map(res => res));
	}
	searchProyecto(token, nombre){
		let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
	
		return this._http.get(this.url+'result-proyecto/'+nombre,options)
		.pipe(map(res => res));
	}
	/**
	myProyecto(token, UserId){
			let options = { headers: new HttpHeaders({
						'Content-Type':'application/json',
						'Authorization': token
						})
					   };
		return this._http.get(this.url+'my-proyectos/'+UserId,options)
				.pipe(map(res => res));
	}**/

}