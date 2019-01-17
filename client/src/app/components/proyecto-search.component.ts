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
	public proyectos: Proyecto[] =[];
	public identity;
	public token;
	public url: string;
	public confirmado;
	public nombre;
	public next_page;
	public pre_page;
	public ArregloProyectos:any[] = [];

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
		this.next_page = 1;
		this.pre_page = 1;
		


	}

	ngOnInit(){
		console.log('Lista de proyectos cargando ...');
		//listado de proyectos
		this.Obtenertodo();
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
	Obtenertodo(){

		this._route.params.forEach((params: Params)=>{
			let page = +params['page'];
				if(!page){
					page = 1; 
				}else{
					this.next_page = page + 1;
					this.pre_page = page - 1;
					if(this.pre_page == 0){
						this.pre_page = 1;
					}
				}
			this._proyectoService.getProyectos(this.token, page).subscribe(
				(response: any) => {
					if(!response.proyectos){
						this._router.navigate(['/']);
					}else{
						this.proyectos = response.proyectos;
						//console.log(this.proyectos);
					}
				},
				error=>{
					var errorMessage = <any>error;
				  		if(errorMessage!=null){
				  		
				  			console.log(error);
				  		}
				}
			);
		});	

	}
	getProyectos(cadena:string){
	this.ArregloProyectos = [];
	for (let proyecto of this.proyectos) {
			let nombre = proyecto.nombre.toLowerCase();

			if (nombre.indexOf(cadena)>=0) {
				this.ArregloProyectos.push(proyecto);	
			}
		}
		console.log(this.ArregloProyectos);
	}
	
}