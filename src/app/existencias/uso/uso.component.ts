import { 	Component, 
			OnInit, 
			AfterViewInit, 
			ViewChild,
			Input, 
			Output,
			EventEmitter }       from '@angular/core';
import { AngularFirestore, 
         AngularFirestoreCollection }   from 'angularfire2/firestore';
import { MatTableDataSource, 
         MatPaginator,
         MatDialog } from '@angular/material';

import { Observable }           from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { CatalogosService }    from '../../servicios/catalogos.service';
import { Mensaje }             from '../../util/mensaje/mensaje.component';

export interface UsoReg{
  id_producto:number,
  cantidad:number,
  fecha:Date,
  nota:string
};
export interface UsoId extends UsoReg{id:string};

@Component({
  selector: 'app-uso',
  templateUrl: './uso.component.html',
  styleUrls: ['./uso.component.css']
})
export class Uso implements OnInit {
	private usoColl: AngularFirestoreCollection<UsoReg>;
    private usoObs: Observable<UsoReg[]>;
    public dsUso:MatTableDataSource<UsoReg>=new MatTableDataSource();
    private cdUso:string[]=['id_producto','cantidad','nota','accion'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public editable:UsoId={
      id : '',
      id_producto:0,
   	  cantidad:0,
      fecha:null,
      nota:''
    };
    public nuevo:UsoReg={
      id_producto:0,
   	  cantidad:0,
      fecha:new Date(),
      nota:''
    };
    editando="";
    public modoEdicion=false;
    public modoDetalle:boolean=false;

  	constructor(private afa:AngularFirestore
                ,public cs:CatalogosService
                ,private dlg:MatDialog) { 
  	  this.usoColl = afa.collection<UsoReg>('materialUso', ref=>ref.orderBy('fecha').startAt(this.nuevo.fecha.getTime()));
      this.usoObs=this.usoColl.snapshotChanges().map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as UsoReg;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
      this.usoObs.subscribe(
          resp=>{
            this.dsUso.data=resp;
            console.log("Exito Uso");
            console.log(this.dsUso.data);
            this.editable.id='';
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

  	agregar(elemento) {
  		for(let n of this.dsUso.data){
  			if(n.id_producto==this.nuevo.id_producto){
  				 let dialogRef = this.dlg.open(Mensaje, {
			        width: '350px',
			        data: { titulo:'Material en Uso', mensaje:'El registro que desea agregar ya existe.', tipo:0 }
			      });

			      dialogRef.afterClosed().subscribe(res => {
			        if(res=='ACEPTAR') console.log("---");
			          //nada que hacer
			        
			      });
			      return;
  			}
  		}
  		console.log(this.nuevo);
    	this.usoColl.add(this.nuevo);
  	}
  	eliminar(elemento) {    
      //console.log(elemento);
      //this.pagosColl.doc('/'+elemento.id).delete();
      let dialogRef = this.dlg.open(Mensaje, {
        width: '350px',
        data: { titulo:'Inventario', mensaje:'Se eliminara el registro de MATERIAL EN USO de forma definitiva. Desea continuar?' }
      });

      dialogRef.afterClosed().subscribe(res => {
        if(res=='ACEPTAR')
          this.usoColl.doc('/'+elemento.id).delete();
      });
  	}
  	iniciarEdicion(registro) {
	    this.editable={...registro};
	    this.modoEdicion=true;
	}
	cancelarEdicion() {
		console.log("cancelanfo edicion");

	    this.editable.id='';
	    console.log(this.editable);
	    this.modoEdicion=false;
	}
	guardarEdicion(registro){
	    this.usoColl.doc('/'+this.editable.id).set(
	      {id_producto:this.editable.id_producto, 
	       cantidad:this.editable.cantidad, 
	       fecha:this.editable.fecha,
	   	   nota:this.editable.nota}
	    );
	    registro.fecha=this.editable.fecha; 
	    registro.id_producto=this.editable.id_producto; 
	    registro.cantidad=this.editable.cantidad 
	    registro.nota= this.editable.nota;
	}
  	cambioFecha(fecha:Date){
  		console.log("****-");
  		let inicio=new Date(fecha.getFullYear(),fecha.getMonth(), fecha.getDate(),0,0,0,0);
  		let termino=new Date(fecha.getFullYear(),fecha.getMonth(), fecha.getDate(),23,59,59,999);
  		console.log(inicio);
  		console.log(termino);
  		this.usoColl = this.afa.collection<UsoReg>('materialUso', ref=>ref.orderBy('fecha').startAt(inicio).endAt(termino));
  		this.usoObs=this.usoColl.snapshotChanges().map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as UsoReg;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
      this.usoObs.subscribe(
          resp=>{
            this.dsUso.data=resp;
            console.log("Exito Uso");
            console.log(this.dsUso.data);
            this.editando="";
            this.modoEdicion=false;
          },
          err=>{
            console.log("Error");
            console.log(err);
          }
      );  
  	}
}
