import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CatalogOffersComponent } from './catalog-offers/catalog-offers.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { Page404Component } from '../page-404/page-404.component';

const routes: Routes = [
  {
    path: 'offer',
    children: [
      /*  { path: '', pathMatch: 'full', component: MainComponent }, */
      { path: 'add', component: AddOfferComponent },
      {
        path: ':offerId',
        children: [{ path: 'details', component: OfferDetailsComponent }],
      },
    ],
  },

  { path: 'offers-catalog', component: CatalogOffersComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
