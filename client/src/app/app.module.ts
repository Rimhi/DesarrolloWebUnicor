import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { ProyectoListComponent } from './components/proyecto-list.component';
import { HomeComponent } from './components/home.component';
import { ProyectoAddComponent } from './components/proyecto-add.component';
import { ProyectoEditComponent } from './components/proyecto-edit.component';
import { ProyectoDetailComponent } from './components/proyecto-detail.component';
import { ProyectoSearchComponent } from './components/proyecto-search.component';
import { FicheroAddComponent } from './components/fichero-add.component';
import { FicheroEditComponent } from './components/fichero-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ProyectoListComponent,
    ProyectoAddComponent,
    ProyectoEditComponent,
    ProyectoDetailComponent,
    ProyectoSearchComponent,
    FicheroAddComponent,
    FicheroEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
