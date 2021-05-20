import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlotSearchComponent } from './slot-search/slot-search.component';
import { BookSlotComponent } from './book-slot/book-slot.component';
import { SlotsComponent } from './slots/slots.component';
import { CapsuleComponent } from './common/capsule/capsule.component';
import { SlotComponent } from './slot/slot.component';

@NgModule({
  declarations: [AppComponent, SlotSearchComponent, BookSlotComponent, SlotsComponent, CapsuleComponent, SlotComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
