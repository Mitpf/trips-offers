import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { CatalogOffersComponent } from './catalog-offers/catalog-offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OfferRoutingModule } from './offers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteOfferComponent } from './delete-offer/delete-offer.component';




@NgModule({
  declarations: [
    AddOfferComponent,
    CatalogOffersComponent,
    OfferDetailsComponent,
    DeleteOfferComponent,
  ],
  imports: [CommonModule, OfferRoutingModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule],
  providers:[DatePipe]
})
export class OffersModule {}
