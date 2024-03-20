import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { CatalogOffersComponent } from './catalog-offers/catalog-offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OfferRoutingModule } from './offers-routing.module';

@NgModule({
  declarations: [
    CreateOfferComponent,
    CatalogOffersComponent,
    OfferDetailsComponent,
  ],
  imports: [CommonModule, OfferRoutingModule],
})
export class OffersModule {}
