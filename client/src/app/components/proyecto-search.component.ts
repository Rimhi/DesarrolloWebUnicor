import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Proyecto } from '../models/proyecto';
import { ProyectoService } from '../services/proyecto.service';


@Component({
	selector: 'proyecto-list',
	templateUrl: '../views/proyecto-list.html',
	providers: [UserService, ProyectoService]	
})

export class ProyectoSearchComponent implements OnInit{
	public titulo: string;
	public proyectos: Proyecto[];
	public identity;
	public token;
	public url: string;
	public confirmado;
	public nombre;

	constructor(
	private _route: ActivatedRoute, 
	private _router: Router, 
	private _userService: UserService, 
	private _proyectoService: ProyectoService){

		this.titulo = 'Buscar';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.confirmado = true;
		


	}

	ngOnInit(){
		console.log('Lista de proyectos cargando ...');


		//listado de proyectos
	}
	getProyectos(nombre:string){		
			this._proyectoService.searchProyecto(this.token,nombre).subscribe(
				(response: any) => {
					if(!response.proyectos){
						alert('problemas con el servidor');
					}else{
					let obj = response.proyectos
					 for(var key in obj) {
				        if(obj.hasOwnProperty(key)){
				           alert('no hay proyectos con el nombre '+nombre);
				   		}
				       }
						this.proyectos = response.proyectos;
						console.log(this.proyectos);
						
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
	onDeleteConfirm(id){
		this.confirmado = id;
	}
	onCancelProyecto(){
		this.confirmado = null;
	}
	/*
	onDeleteProyecto(id){
		this._proyectoService.deleteProyecto(this.token, id).subscribe(
			(response: any) => {
						this.getProyectos();
				},
				error=>{
					var errorMessage = <any>error;
				  		if(errorMessage!=null){
				  		
				  			console.log(error);
				  		}
				}

		);	

	}*/
	obtenerDato(){
		    //this.nombre = document.getElementById('search').value;
			this.getProyectos(this.nombre);
		
	}
	/*
	myProyecto(){
		this._proyectoService.myProyecto(this.token,this.identity._id).subscribe(
				(response: any) => {
					if(!response.proyectos){
						alert('no tienes proyectos');
					}else{
						this.proyectos = response.proyectos;
						console.log(this.proyectos);

					}
				},
				error=>{
					var errorMessage = <any>error;
				  		if(errorMessage!=null){
				  		
				  			console.log(error);
				  		}
				}
			);
	}*/
	
}