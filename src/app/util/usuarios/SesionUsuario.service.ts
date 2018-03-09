import { Injectable }     					from '@angular/core';

import { isDevMode } 						from '@angular/core';
import { AngularFireAuth } 					from 'angularfire2/auth';
import { AngularFirestore,
         AngularFirestoreCollection }   from 'angularfire2/firestore';

import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MRegistro } 		from './MRegistro';
import { RespuestaUsuario }	from './RespuestaUsuario';

export interface Usuario{correo:string, tipo:string, nombre:string}

@Injectable()
export class SesionUsuario{

  	private usuarioActivo:string="";
  	private tipoUsuario:string="";
    public estadoSesion:string="Desconectado";
    public perfiles:any;

    private usuariosColl: AngularFirestoreCollection<Usuario>;

	constructor(
		private afa:AngularFireAuth,
        private afs:AngularFirestore){
	  	this.estadoSesion="Desconectado";
	  	this.afa.auth.onAuthStateChanged(
	      sc=>this.cambioEstado(sc)
	    );
	}
	cambioEstado(e){
	    console.log("Cambio de estado usuario");
	    //console.log(e);
	    if(e){
	      this.estadoSesion='Conectado';
	      this.usuarioActivo=e.displayName;
	      this.usuariosColl= this.afs.collection<Usuario>('usuarios', ref=>ref.where('correo','==',e.email))
	      this.usuariosColl.valueChanges().subscribe(resp=>this.obtRegistro(resp), err=>this.obtRegistroError(err));
	    
	    }else{
	      this.estadoSesion='Desconectado';
	      this.usuarioActivo='';
	    }
	}

	obtRegistro(resp){
		console.log(resp);
	    console.log(resp[0].perfil);
	    this.estadoSesion='Conectado';
	    if(!this.usuarioActivo)
	    this.usuarioActivo=resp[0].nombre;
	    this.tipoUsuario=resp[0].tipo;
	    this.perfiles=resp[0].perfil;
	}
	obtRegistroError(err){
	    console.log(err);
	    this.usuarioActivo="";
	    this.tipoUsuario="";
	}
}

