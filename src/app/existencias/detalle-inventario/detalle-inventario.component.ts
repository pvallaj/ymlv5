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

export interface DetalleInventarioReg{
  id_producto:number,
  almacen:number,
  vitrina:number,
  local:number,
  existencia_anterior:number,
  consolidado:number,
  ventas:number
};
export interface DetalleInventarioId extends DetalleInventarioReg{id:string};

@Component({
  selector: 'app-detalle-inventario',
  templateUrl: './detalle-inventario.component.html',
  styleUrls: ['./detalle-inventario.component.css']
})
export class DetalleInventario implements OnInit {
	private inventarioColl: AngularFirestoreCollection<DetalleInventarioReg>;
    private inventarioObs: Observable<DetalleInventarioReg[]>;
    public dsInventario:MatTableDataSource<DetalleInventarioReg>=new MatTableDataSource();
    private cdInventario:string[]=['id_producto','vitrina','local','almacen','existencia_anterior','ventas','consolidado', 'accion'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
  	
  	@Input('idinventario') idinv:string="";
  	@Output() terminar:EventEmitter<string>=new EventEmitter<string>();
  	editando="";
    public modoEdicion=false;

    public producto:number;

  constructor(private afa:AngularFirestore
                ,public cs:CatalogosService
                ,private dlg:MatDialog) { 
         
    }

    public recarga(){
      console.log('inventario/'+this.idinv+'/existencias');
      this.inventarioColl = this.afa.collection<DetalleInventarioReg>('inventario/'+this.idinv+'/existencias', ref=>ref.orderBy('id_producto','asc'));
      this.inventarioObs=this.inventarioColl.snapshotChanges().map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as DetalleInventarioReg;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        });
      this.inventarioObs.subscribe(
          resp=>{
            this.dsInventario.data=resp;
            console.log("Exito");
            console.log(this.dsInventario.data);
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
  	
  	this.recarga();
  }
  agregar(elemento) {
      let nuevo={
        id_producto:this.producto,
	  	almacen:0,
	  	vitrina:0,
	  	local:0,
	  	existencia_anterior:0,
	  	consolidado:0,
	  	ventas:0
      };
      this.inventarioColl.add(nuevo);
  }

  eliminar(elemento) {    

      let dialogRef = this.dlg.open(Mensaje, {
        width: '350px',
        data: { titulo:'Inventario', mensaje:'Se eliminara el registro de DETALLE DE INVENTARIO de forma definitiva. Desea continuar?' }
      });

      dialogRef.afterClosed().subscribe(res => {
        if(res=='ACEPTAR')
          this.inventarioColl.doc('/'+elemento.id).delete();
      });
  }

  terminarEdicion(){
  	this.terminar.emit("edicion terminada");
  }

}
