import { Component, OnInit, AfterViewInit, ViewChild } 			from '@angular/core';
import { AngularFirestore, 
		 AngularFirestoreCollection } 	from 'angularfire2/firestore';
import { MatTableDataSource, 
		 MatPaginator } from '@angular/material';
import { Observable } 					from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CatalogosService } from '../servicios/catalogos.service';
export interface Pago{
	t_pago:number,
	monto:number,
	fecha:Date,
  nota: string
};
export interface PagoId extends Pago{id:string};

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
  providers:[]
})

export class PagosComponent implements OnInit {
	private pagosColl: AngularFirestoreCollection<Pago>;
  	private pagosObs: Observable<Pago[]>;
  	private dsPagos:MatTableDataSource<Pago>=new MatTableDataSource();
  	private camposDesplegar:string[]=['t_pago','fecha','monto', 'nota', 'accion'];
  	@ViewChild(MatPaginator) paginator: MatPaginator;

    private fecha:Date=new Date();
    private t_pago:number=2;
    private monto:number=0;
    private nota:string="";

    private fechaEdicion:Date=new Date();
    private t_pagoEdicion:number=2;
    private montoEdicion:number=0;
    private notaEdicion:string="";

    editando="";
    private modoEdicion=false;

  	constructor(private afa:AngularFirestore
                ,private cs:CatalogosService) { 
  		this.pagosColl = afa.collection<Pago>('pagos');
    	this.pagosObs=this.pagosColl.snapshotChanges().map(
    		actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Pago;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
      this.pagosObs.subscribe(
          resp=>{
            this.dsPagos.data=resp;
            console.log("Exito");
            console.log(this.dsPagos.data);
            this.editando="";
            this.modoEdicion=false;
          },
          err=>{
            console.log("Error");
            console.log(err);
          }
      );  
  	}

  ngOnInit() {

  }
  seleccionado(registro){
    console.log(registro);
  }
  ngAfterViewInit(){
	    this.dsPagos.paginator = this.paginator;
	}

  agregar(elemento) {
	    console.log(elemento);
      this.pagosColl.add(elemento.value);
	}
	iniciarEdicion(registro) {
	  this.editando=registro.id;
    this.t_pagoEdicion=registro.t_pago;
    this.montoEdicion=registro.monto;
    this.fechaEdicion=registro.fecha;
    this.notaEdicion=registro.nota;
    this.modoEdicion=true;
	}
  cancelarEdicion() {
    this.editando="";
    this.modoEdicion=false;
  }
	eliminar(elemento) {    
	    console.log(elemento);
      this.pagosColl.doc('/'+elemento.id).delete();
	}
	guardarEdicion(){
    this.pagosColl.doc('/'+this.editando).set(
      {fecha:this.fechaEdicion, t_pago:this.t_pagoEdicion, monto:this.montoEdicion, nota: this.notaEdicion}
    );
  }
}
