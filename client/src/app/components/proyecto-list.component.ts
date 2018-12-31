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

export class ProyectoListComponent implements OnInit{
	public titulo: string;
	public proyectos: Proyecto[];
	public identity;
	public token;
	public url: string;
	public next_page;
	public pre_page;
	public confirmado;

	constructor(
	private _route: ActivatedRoute, 
	private _router: Router, 
	private _userService: UserService, 
	private _proyectoService: ProyectoService){

		this.titulo = 'Proyectos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.pre_page = 1;


	}

	ngOnInit(){
		console.log('Lista de proyectos cargando ...');

		this.getProyectos();

		//listado de proyectos
	}
	getProyectos(){
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
		});		
	}
	onDeleteConfirm(id){
		this.confirmado = id;
	}
	onCancelProyecto(){
		this.confirmado = null;
	}
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

	}
}