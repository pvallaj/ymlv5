import { NgModule } from '@angular/core';
import { 	MatButtonModule, MatDialogModule, MatSidenavModule, MatCheckboxModule, MatListModule 
			,MatToolbarModule, MatInputModule, MatTableModule, MatSelectModule, MatRadioModule 
			,MatPaginatorModule, MatTabsModule, MatProgressSpinnerModule, MatFormFieldModule
			,MatDatepickerModule, MatNativeDateModule, MatIconModule 
			 } from '@angular/material';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	imports:[MatButtonModule, MatDialogModule, MatSidenavModule, MatCheckboxModule, MatListModule 
			,MatToolbarModule, MatInputModule, MatTableModule, MatSelectModule, MatRadioModule
			,MatPaginatorModule, MatTabsModule, MatProgressSpinnerModule, MatFormFieldModule
			,MatDatepickerModule, MatNativeDateModule, MatIconModule],
	exports:[MatButtonModule, MatDialogModule, MatSidenavModule, MatCheckboxModule, MatListModule 
			,MatToolbarModule, MatInputModule, MatTableModule, MatSelectModule, MatRadioModule
			,MatPaginatorModule, MatTabsModule, MatProgressSpinnerModule, MatFormFieldModule
			,MatDatepickerModule, MatNativeDateModule, MatIconModule]
})
export class MaterialModule {}