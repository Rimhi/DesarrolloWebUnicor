import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Proyecto } from '../models/proyecto';


@Component({
	selector: 'home',
	templateUrl: '../views/home.html',
	providers: [UserService]	
})

export class HomeComponent implements OnInit{
	public titulo: string;
	public proyectos: Proyecto[];
	public identity;
	public token;
	public url: string;

	constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService){

		this.titulo = 'Proyectos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;


	}

	ngOnInit(){
		console.log('Lista de proyectos cargando ...');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		console.log(this.token);
  		console.log(this.identity);	

		//listado de proyectos
	}

}