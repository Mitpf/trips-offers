import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { CatalogOffersComponent } from './catalog-offers/catalog-offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OfferRoutingModule } from './offers-routing.module';

@NgModule({
  declarations: [
    AddOfferComponent,
    CatalogOffersComponent,
    OfferDetailsComponent,
  ],
  imports: [CommonModule, OfferRoutingModule],
})
export class OffersModule {}
