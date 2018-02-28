import { Component, Input }   from '@angular/core';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import { AngularFireAuth }    from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AngularFirestore,
         AngularFirestoreCollection }   from 'angularfire2/firestore';

import { Usuario,
         SesionUsuario }       from './SesionUsuario.service';

@Component({
  moduleId:   module.id,
  selector:   'registro-usuario',
  templateUrl:'registro.component.html',
  styleUrls:  [ './registro.component.css']
})
export class Registro {
  @Input() tipo:string;

  submitted =    false;
  ruteador :     Router;
  closeResult:   string;
  repeticion:    string;
  nombre:        string;
  password:      string;
  usuario:       string;

  private procesoActivo:boolean=false;
  private usuariosColl: AngularFirestoreCollection<Usuario>;
  private nuevoUsuario:Observable<Usuario[]>;

  constructor( 
          private _router:Router, 
          private afa:AngularFireAuth,
          private afs:AngularFirestore,
          public su:SesionUsuario) {
  }
  
  autenticarGoogle(){
    this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(resp=>this.respAutGloogle(resp));
  }
  respAutGloogle(resp){
    console.log("Con GLOOGLE");
    console.log(resp);
  }

  autenticar() { 
    this.procesoActivo=true;
    this.afa.auth.signInWithEmailAndPassword(this.usuario, this.password)
    .then(r=>{
      this.autenticacionExitosa(r)
    }).catch(
      e=>this.autenticaError(e)
    );
  }
   autenticacionExitosa(resp){
    this.procesoActivo=false;
  }
  autenticaError(err){
    console.log(err);
    this.procesoActivo=false;
  }

  registrarUsuario(){
    this.procesoActivo=true;
    this.afa.auth.createUserWithEmailAndPassword(this.usuario, this.password)
    .then(r=>{
      console.log("Registro de usuario exitoso!");
      console.log(r);
       this.usuariosColl= this.afs.collection<Usuario>('usuarios');
       this.usuariosColl.add({correo:this.usuario, tipo:'operativo', nombre:this.nombre })
         .then((resp:any)=>this.registroExitoso(resp))
         .catch((ru:any)=>this.registroError(ru));
    })
    .catch(
      e=>{
        console.log("Error en el registro");
        console.log(e);
      }
    );
  }
  registroExitoso(resp){
    this.procesoActivo=false;
    this.password="";
    this.usuario="";
    this.nombre="";
    this.repeticion="";
    this.tipo="autenticar";
  }
 
  registroError(err){
    this.procesoActivo=false;
  }

  salir() { 
    this.afa.auth.signOut();
  }
  
}