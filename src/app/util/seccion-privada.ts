
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { SesionUsuario }               from './usuarios/SesionUsuario.service';

@Injectable()
export class SeccionPrivada implements CanActivate{
	constructor(private su: SesionUsuario, private router:Router) {}

	canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
		console.log('CANACTIVATE: ['+this.su.estadoSesion+"]");
	    if(this.su.estadoSesion=="Conectado"){
	    	console.log('CANACTIVATE: PERMITIDO 1');
	    	if(!this.su.perfiles){
	    		this.router.navigate(['/']);
	    		return false;
	    	}
	    	let seccion=route.data["ruta"];
	    	for(let p of this.su.perfiles){
	    		console.log('ruta:'+seccion+"----"+p);
	    		if(p==seccion) return true;
	    	}
	    	return false;	
	    } 
	    console.log('CANACTIVATE: RECHAZADO');
	    this.router.navigate(['/']);
	    return false;
	  }
}
