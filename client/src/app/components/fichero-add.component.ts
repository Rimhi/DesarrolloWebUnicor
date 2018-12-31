import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { FicheroService } from '../services/fichero.service';
import { GLOBAL } from '../services/global';
import { Fichero } from '../models/fichero'


@Component({
	selector: 'fichero-add',
	templateUrl: '../views/fichero-add.html',
	providers: [UserService,FicheroService]	
})


export class FicheroAddComponent implements OnInit{
	public titulo: string;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public fichero: Fichero;

	constructor(private _route: ActivatedRoute, 
	private _router: Router, 
	private _userService: UserService, 
	private _ficheroService: FicheroService
	){

		this.titulo = 'Crear Fichero';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.fichero = new Fichero('','','','','','');


	}

	ngOnInit(){
		console.log('Lista de proyectos cargando ...');

		//listado de proyectos
	}
	
	onSubmit(){
			
		
		this._route.params.forEach((params:Params)=>{
		let proyectoId = params['id'];
		this.fichero.proyecto = proyectoId;
		console.log(this.fichero);
		
		this._ficheroService.addFichero(this.token, this.fichero).subscribe(
			(response: any) => {
			if(!response.fichero){
				this.alertMessage = 'error en el servidor';
			}else{
				this.alertMessage = 'se agregado correctamente';
				this.fichero = response.fichero;
				console.log(this.fichero);
				this._router.navigate(['/edit-fichero', response.fichero._id]);
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