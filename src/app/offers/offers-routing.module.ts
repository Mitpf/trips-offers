import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CatalogOffersComponent } from './catalog-offers/catalog-offers.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';

const routes: Routes = [
  {
    path: 'offer',
    children: [
      /*  { path: '', pathMatch: 'full', component: MainComponent }, */
      { path: 'create', component: CreateOfferComponent },
      {
        path: ':offerId',
        children: [{ path: 'details', component: OfferDetailsComponent }],
      },
    ],
  },

  { path: 'offers-catalog', component: CatalogOffersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
