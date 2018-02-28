import { Component, OnInit, AfterViewInit, ViewChild }       from '@angular/core';
import { AngularFirestore, 
         AngularFirestoreCollection }   from 'angularfire2/firestore';
import { MatTableDataSource, 
         MatPaginator,
         MatDialog } from '@angular/material';

import { Observable }           from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {  } from '../util';

import { CatalogosService }    from '../../servicios/catalogos.service';
import { Mensaje }             from '../../util/mensaje/mensaje.component';
export interface InventarioReg{
  fecha:Date,
  fecha_confronta:Date,
  idconfronta:string,
  nota:string
};
export interface InventarioId extends InventarioReg{id:string};


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers:[]
})

export class Inventario implements OnInit {
    private inventarioColl: AngularFirestoreCollection<InventarioReg>;
    private inventarioObs: Observable<InventarioReg[]>;
    public dsInventario:MatTableDataSource<InventarioReg>=new MatTableDataSource();
    private cdInventario:string[]=['fecha','fecha_confronta','nota','accion'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public nuevo:InventarioId={
      fecha : new Date(),
      fecha_confronta: new Date(),
      idconfronta:"",
      nota:"",
      id:""
    };

    public editable:InventarioId={
      fecha : new Date(),
      fecha_confronta: new Date(),
      idconfronta:"",
      nota:"",
      id:""
    };
    editando="";
    public modoEdicion=false;
    public modoDetalle:boolean=false;
    public idinv:string='';
    constructor(private afa:AngularFirestore
                ,public cs:CatalogosService
                ,private dlg:MatDialog) { 
      this.inventarioColl = afa.collection<InventarioReg>('inventario', ref=>ref.orderBy('fecha','desc'));
      this.inventarioObs=this.inventarioColl.snapshotChanges().map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as InventarioReg;
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

  }
  seleccionado(registro){
    console.log(registro);
  }
  ngAfterViewInit(){
      this.dsInventario.paginator = this.paginator;
  }

  agregar(elemento) {
      let nuevo={
        fecha:            this.nuevo.fecha,
        fecha_confronta:  this.nuevo.fecha_confronta,
        idconfronta:      this.nuevo.idconfronta,
        nota:             this.nuevo.nota
      };
      this.inventarioColl.add(nuevo);
  }
  iniciarEdicion(registro) {
    this.editando=registro.id;
    this.editable=registro;
    this.modoEdicion=true;
  }
  cancelarEdicion() {
    this.editando="";
    this.modoEdicion=false;
  }
  eliminar(elemento) {    
      //console.log(elemento);
      //this.pagosColl.doc('/'+elemento.id).delete();
      let dialogRef = this.dlg.open(Mensaje, {
        width: '350px',
        data: { titulo:'Inventario', mensaje:'Se eliminara el registro de CONFRONTA DE INVETARIO de forma definitiva. Desea continuar?' }
      });

      dialogRef.afterClosed().subscribe(res => {
        if(res=='ACEPTAR')
          this.inventarioColl.doc('/'+elemento.id).delete();
      });
  }
  guardarEdicion(registro){
    this.inventarioColl.doc('/'+this.editando).set(
      {fecha:this.editable.fecha, 
        fecha_confronta:this.editable.fecha_confronta, 
        idconfronta:this.editable.idconfronta, 
        nota: this.editable.nota}
    );
    registro.fecha=this.editable.fecha, 
    registro.fecha_confronta=this.editable.fecha_confronta, 
    registro.idconfronta=this.editable.idconfronta, 
    registro.nota= this.editable.nota
  }

  detalle(element){
    this.idinv=element.id;
    this.modoDetalle=true;
    console.log("--->"+this.idinv);
  }
  terminar(){
    this.idinv=null;
    this.modoDetalle=false;
  }
}
