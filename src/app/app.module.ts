import { BrowserModule } 	      from '@angular/platform-browser';
import { NgModule } 		        from '@angular/core';
import { RouterModule } 	      from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { MaterialModule } 	    from './material.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule }      from 'angularfire2';
import { AngularFireAuthModule }  from 'angularfire2/auth';
import { FlexLayoutModule }     from '@angular/flex-layout';
import { environment }          from '../environments/environment';

import { AppComponent } 		    from './app.component';
import { InicioComponent } 		  from './inicio/inicio.component';
import { UtilModule }           from './util/UtilModule.module';
import { Mensaje }              from './util/mensaje/mensaje.component';
import { ConexionService
         ,UtilS
         ,AuthService
         ,SesionUsuario}       from './util';

import { AngularFirestore }   from 'angularfire2/firestore';

import { PagosComponent }          from './pagos/pagos.component';
import { Inventario }              from './existencias/inventario/inventario.component';
import { DetalleInventario }       from './existencias/detalle-inventario/detalle-inventario.component';
import { CatalogosService }        from './servicios/catalogos.service';
import { TipoPago }                from './util/tipo-pago.pipe';
import { TipoProducto }            from './util/tipo-producto.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PagosComponent, Inventario, DetalleInventario,
    TipoPago, TipoProducto,
    Mensaje
  ],
  imports: [
    BrowserModule, MaterialModule, HttpModule, UtilModule, FormsModule, BrowserAnimationsModule,
    AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebase), FlexLayoutModule,
    RouterModule.forRoot([
            { path: '',                  component: InicioComponent  },
            { path: 'inicio',            component: InicioComponent },
            { path: 'pagos',             component: PagosComponent },
            { path: 'inventario',        component: Inventario },
            { path: 'detinventario',     component: DetalleInventario }
           /* { path: 'nomina',            component: NominaComponent ,   canActivate:[Privada]},*/
          ])
  ],
  providers: [
     AngularFirestore, CatalogosService
  ],
  bootstrap: [AppComponent],
  entryComponents:[Mensaje]
})
export class AppModule {
    constructor(private cs:CatalogosService){
      cs.cargarCatalogo(['t_pago','producto']);
    }
 }
