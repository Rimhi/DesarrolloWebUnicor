import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { FicheroService } from '../services/fichero.service';
import { GLOBAL } from '../services/global';
import { Fichero } from '../models/fichero'
import { UploadService } from '../services/upload.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
	selector: 'fichero-edit',
	templateUrl: '../views/fichero-add.html',
	providers: [UserService,FicheroService,UploadService]	
})


export class FicheroEditComponent implements OnInit{
	public titulo: string;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public fichero: Fichero;
	public is_edit;
	public filesToUpload;
	public  urlSafe: SafeResourceUrl;
	public urlfichero:string;

	constructor(
	private _route: ActivatedRoute, 
	private _router: Router, 
	private _userService: UserService, 
	private _ficheroService: FicheroService,
	private _uploadService: UploadService,
	public sanitizer: DomSanitizer
	){

		this.titulo = 'Editar Fichero';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.fichero = new Fichero('','','','','',''); 
			
		this.is_edit = true;
		


	}

	ngOnInit(){


		
		//sacar la cancion a editar
		this.getFichero();
		
	}

	getFichero(){
		this._route.params.forEach((params:Params)=>{
			let id = params['id'];
			this._ficheroService.getFichero(this.token,id).subscribe(
			(response:any)=>{
			if(!response.file){
				this._router.navigate(['/']);
			}else{
				this.fichero = response.file;
				this.urlfichero = this.url+'get-file-proyecto/'+this.fichero.file;
				this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlfichero);
				console.log(this.urlSafe);
			}
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
			});
	}
	
	onSubmit(){
			

		this._route.params.forEach((params:Params)=>{
			let id = params['id'];
		
		this._ficheroService.editFichero(this.token, id, this.fichero).subscribe(

			(response:any) => {
			if(!response.fichero){
				this.alertMessage = 'error en el servidor';
			}else{
				this.alertMessage = 'se agregado actualizado';
				console.log(this.fichero);
				this._router.navigate(['/proyecto/',response.fichero.proyecto]);
				if(!this.filesToUpload){
				//redirigir

				}else{
				//subir imagen
					this._uploadService.makeFileRequest(this.url+'upload-file-fichero/'+id,[],this.filesToUpload,this.token, 'file')
									.then(
										(result)=>{
											this._router.navigate(['/proyecto/',response.fichero.proyecto]);
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
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}