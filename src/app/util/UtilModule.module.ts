import { NgModule } 		from '@angular/core';
import { CommonModule } 	from '@angular/common';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { MaterialModule }   from '../material.module';
import { SesionUsuario } 	from './usuarios/SesionUsuario.service';
import { FlexLayoutModule } 		from '@angular/flex-layout';

import { Registro } 		from './usuarios/registro.component';


@NgModule({
	declarations: [Registro],
	imports:[CommonModule, BrowserModule, FormsModule, MaterialModule, FlexLayoutModule],
	exports:[Registro ],
	providers:[SesionUsuario]
})
export class UtilModule{}

