import { Component, OnInit }  from '@angular/core';
import { SesionUsuario,
         ConexionService }      from './util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SesionUsuario, ConexionService]
})
export class AppComponent implements OnInit{

  private mostratMenu:boolean=false;
	constructor (private su:SesionUsuario, private cnx:ConexionService){
    
	}
  ngOnInit(){}
  

}
