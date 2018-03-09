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
	tipo:number=0;  //0 notificacion, 1 si/no
	constructor(
		public dialogRef: MatDialogRef<Mensaje>, 
		@Inject(MAT_DIALOG_DATA) public data:any) {
		this.titulo=data.titulo;
		this.mensaje=data.mensaje;
		console.log("Tipo Mensaje:"+data.tipo);
		if(data.tipo>=0) 
			this.tipo=data.tipo;
		else	
			this.tipo=1;
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
