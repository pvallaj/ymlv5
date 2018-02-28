import { Injectable } from '@angular/core';
import { AngularFirestore }   from 'angularfire2/firestore';
import { Observable }         from 'rxjs/Observable';
import { Subscription }       from 'rxjs/Subscription';

export interface Catalogo{id:number, descripcion:string};
export interface Productos{id:number, descripcion:string};

@Injectable()
export class CatalogosService {
	private rsCatalogo:Observable<any>;
	public  cPagos:Catalogo[];
	public  cProductos:Catalogo[];
	private catalogos:string[];
	private idx:number=0;
  	private sus:Subscription;
	constructor( private af:AngularFirestore) {
		console.log("Iniciando catalogo de servicio...");
		//this.cargarCatalogo('t_pago');
	}
	cargarCatalogo(catalogo:string[]){
		this.catalogos=catalogo;
		this.rsCatalogo=this.af.collection(this.catalogos[this.idx], ref=>ref.orderBy('descripcion','asc')).valueChanges();
	    this.sus=this.rsCatalogo.subscribe(
	      (resp)=>this.catalogosResp(resp),
	      err=>this.catalogosErr(err)
	    );
	}
	 catalogosResp(resp){
	 	switch (this.catalogos[this.idx]) {
	 		case "t_pago":
	 			this.cPagos=resp;
	 			break;
	 		case "producto":
	 			this.cProductos=resp;
	 			break;
	 	}
	    
	    console.log("cargando:"+this.catalogos[this.idx]);
	    this.sus.unsubscribe();
	    this.idx++;
	    if(this.catalogos.length-1>=this.idx){
	    	this.rsCatalogo=this.af.collection(this.catalogos[this.idx], ref=>ref.orderBy('descripcion','asc')).valueChanges();
		    this.sus=this.rsCatalogo.subscribe(
		      (resp)=>this.catalogosResp(resp),
		      err=>this.catalogosErr(err)
		    );
	    }
	}
	catalogosErr(err){
		console.log("Error Catalogos");
	    console.log(err);
	}
}