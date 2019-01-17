import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { FicheroService } from '../services/fichero.service';
import { GLOBAL } from '../services/global';
import { User } from '../models/user'
import { Proyecto } from '../models/proyecto';
import { Fichero } from '../models/fichero';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'proyecto-detail',
	templateUrl: '../views/proyecto-detail.html',
	providers: [UserService, ProyectoService,FicheroService]	
})

export class ProyectoDetailComponent implements OnInit{
	public user: User;
	public proyecto: Proyecto;
	public identity;
	public token;
	public ficheros: Fichero[];
	public url: string;
	public urlfichero: string;
	public alertMessage;
	public  urlSafe: SafeResourceUrl;
	

	constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _proyectoService: ProyectoService,private _ficheroService:FicheroService,public sanitizer: DomSanitizer){

		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.proyecto = new Proyecto('','','','','');


	}

	ngOnInit(){
		console.log('edit proyectos cargando ...');

		//conseguir proyecto
		this.getProyecto();

	}
	
	getProyecto(){
		this._route.params.forEach((params: Params)=>{
			let id = params['id'];
			this._proyectoService.getProyecto(this.token,id).subscribe(
			(response: any) => {
			if(!response.proyecto){
				this._router.navigate(['/']);
			}else{
				this.proyecto = response.proyecto;
				//sacar los ficheros de los proyectos
				this._ficheroService.getFicheros(this.token,id).subscribe(
				(response: any) => {
					if(!response.ficheros){
						alert('este proyecto no tiene archivos');
					}else{
						this.ficheros = response.ficheros;
						console.log(this.ficheros);

					}
				},
				error=>{
					var errorMessage = <any>error;
				  		if(errorMessage!=null){
				  		
				  			console.log(error);
				  		}
				}
			);

			}
			},error=>{
				var errorMessage = <any>error;
		  		if(errorMessage!=null){
		  			//var body = JSON.parse(error._body);
		  			//this.alertMessage = body.message;
		  			console.log(error);
		  		}
		  	}	
			);
		});
	}
	public confirmado;
	onDeleteConfirm(id){
		this.confirmado = id;
	}
	onCancelFichero(){
		this.confirmado = null;
	}
	onDeleteFichero(id){
		this._ficheroService.deleteFichero(this.token,id).subscribe(
			(response:any) =>{
				if(!response.fichero){
					alert('Error en el servidor');
				}
				this.getProyecto();
			}
			,error=>{
				var errorMessage = <any>error;
		  		if(errorMessage!=null){
		  			//var body = JSON.parse(error._body);
		  			//this.alertMessage = body.message;
		  			console.log(error);
		  		}
		  	}	

		);
	}

}