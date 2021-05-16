import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class AngularMaterialModule {}
