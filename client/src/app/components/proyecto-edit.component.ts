import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { GLOBAL } from '../services/global';
import { User } from '../models/user'
import { Proyecto } from '../models/proyecto';
import { UploadService } from '../services/upload.service';

@Component({
	selector: 'proyecto-edit',
	templateUrl: '../views/proyecto-add.html',
	providers: [UserService, ProyectoService, UploadService]	
})

export class ProyectoEditComponent implements OnInit{
	public titulo: string;
	public user: User;
	public proyecto: Proyecto;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public is_edit;

	constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _proyectoService: ProyectoService, private _uploadService: UploadService){

		this.titulo = 'Editar proyecto';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.proyecto = new Proyecto('','','','','');
		this.is_edit = true;


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
	
	onSubmit(){
		this._route.params.forEach((params:Params)=>{
			let id = params['id'];
		
		this._proyectoService.editProyecto(this.token, id, this.proyecto).subscribe(

			(response:any) => {
			if(!response.proyecto){
				this.alertMessage = 'error en el servidor';
			}else{
				this.alertMessage = 'se agregado actualizado';
				if(!this.filesToUpload){
				//redirigir

				}else{
				//subir imagen
					this._uploadService.makeFileRequest(this.url+'upload-image-proyecto/'+id,[],this.filesToUpload,this.token, 'image')
									.then(
										(result)=>{
											this._router.navigate(['/proyectos/', 1]);
										},
										(error)=>{
											console.log(error);
										}
									);
				}
				

				

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
	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}