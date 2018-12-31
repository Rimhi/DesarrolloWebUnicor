import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/user-edit.component';
import { ProyectoListComponent } from './components/proyecto-list.component';
import { HomeComponent } from './components/home.component';
import { ProyectoAddComponent } from './components/proyecto-add.component';
import { ProyectoEditComponent } from './components/proyecto-edit.component';
import { ProyectoDetailComponent } from './components/proyecto-detail.component';
import { ProyectoSearchComponent } from './components/proyecto-search.component';
import { FicheroAddComponent } from './components/fichero-add.component';
import { FicheroEditComponent } from './components/fichero-edit.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: 'proyectos/:page', component: ProyectoListComponent},
	{path: 'add-proyecto/:id', component: ProyectoAddComponent},
	{path: 'edit-proyecto/:id', component: ProyectoEditComponent},
	{path: 'proyecto/:id', component: ProyectoDetailComponent},
	{path: 'add-fichero/:id', component: FicheroAddComponent},
	{path: 'edit-fichero/:id', component: FicheroEditComponent},
	{path: 'search-proyectos', component: ProyectoSearchComponent},
	{path: '**', component: HomeComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);