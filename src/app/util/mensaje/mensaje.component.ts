import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class Mensaje implements OnInit {
	
	titulo:string="Mensaje titulo";
	mensaje:string="Este es el mensaje";

	constructor(
		public dialogRef: MatDialogRef<Mensaje>, 
		@Inject(MAT_DIALOG_DATA) public data:any) {
		this.titulo=data.titulo;
		this.mensaje=data.mensaje; 
	}

	ngOnInit() {
	}

	aceptar(){
		console.log("cerrando la vengtana...");
		this.dialogRef.close("ACEPTAR");
	}
	cancelar(){
		this.dialogRef.close("CANCELAR");
	}

}
