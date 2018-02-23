import { Injectable } from '@angular/core';
import { AngularFirestore }   from 'angularfire2/firestore';
import { Observable }         from 'rxjs/Observable';
import { Subscription }       from 'rxjs/Subscription';

export interface catalogo{id:number, descripcion:string};

@Injectable()
export class CatalogosService {
	private rsTPagos:Observable<any>;
	public  cPagos:catalogo[];
  	private sus:Subscription;
	constructor( private af:AngularFirestore) {
		console.log("Iniciando catalogo de servicio...");
		this.cargarCatalogo('t_pago');
	}
	cargarCatalogo(catalogo:string){
		this.rsTPagos=this.af.collection(catalogo).valueChanges();
		
	    this.sus=this.rsTPagos.subscribe(
	      (resp)=>this.catalogosResp(resp),
	      err=>this.catalogosErr(err)
	    );
	}
	 catalogosResp(resp){
	    this.cPagos=resp;
	    console.log("Catalogos cargados");
	    console.log(this.rsTPagos);
	    this.sus.unsubscribe();
	}
	catalogosErr(err){
		console.log("Error Catalogos");
	    console.log(err);
	}
}