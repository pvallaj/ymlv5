import { Pipe, PipeTransform } from '@angular/core';
import { CatalogosService } from '../servicios/catalogos.service';
@Pipe({
  name: 'tipoProducto'
})
export class TipoProducto  {
	constructor(private cs:CatalogosService){}
  	transform(value: number): string {
    	for(let e of this.cs.cProductos){
    		if(e.id==value) return e.descripcion;
    	}
    	return '';
  	}

}