import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { GLOBAL } from '../services/global';
import { User } from '../models/user'
import { Proyecto } from '../models/proyecto';

@Component({
	selector: 'proyecto-add',
	templateUrl: '../views/proyecto-add.html',
	providers: [UserService, ProyectoService]	
})


export class ProyectoAddComponent implements OnInit{
	public titulo: string;
	public user: User;
	public proyecto: Proyecto;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _proyectoService: ProyectoService){

		this.titulo = 'Crear un nuevo proyecto';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.proyecto = new Proyecto('','','','','');


	}

	ngOnInit(){
		console.log('Lista de proyectos cargando ...');

		//listado de proyectos
	}
	onSubmit(){

		this._route.params.forEach((params:Params)=>{
		let userId = params['id'];
		this.proyecto.user = userId;
		this._proyectoService.addProyecto(this.token, this.proyecto).subscribe(
			(response: any) => {
			if(!response.proyecto){
				this.alertMessage = 'error en el servidor';
			}else{
				this.alertMessage = 'se agregado correctamente';
				this.proyecto = response.proyecto;
				console.log("OK STATUS 200");
				console.log(this.proyecto);
				this._router.navigate(['/edit-proyecto/', response.proyecto._id]);
			}
			},error=>{
				var errorMessage = <any>error;
		  		if(errorMessage!=null){
		  			console.log(error);
		  		}
		  	}	

		);

		});
		
		
	}

}