import { Pipe, PipeTransform } from '@angular/core';
import { CatalogosService } from '../servicios/catalogos.service';
@Pipe({
  name: 'tipoPago'
})
export class TipoPago  {
	constructor(private cs:CatalogosService){}
  	transform(value: number): string {
    	for(let e of this.cs.cPagos){
    		if(e.id==value) return e.descripcion;
    	}
    	return '';
  	}

}
