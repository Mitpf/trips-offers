import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CatalogOffersComponent } from './catalog-offers/catalog-offers.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { Page404Component } from '../page-404/page-404.component';
import { AuthActivate } from '../route-gurads/auth.activate';
import { isOwner } from '../route-gurads/isOwner.activate';



const routes: Routes = [
  {
    path: 'offer/add',
    component: AddOfferComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'offer/:offerId/details',
    component: OfferDetailsComponent,
  },
  {
    path: 'offer/:offerId/edit',
    component: AddOfferComponent,
    canActivate: [AuthActivate, isOwner],
  },

  { path: 'offers-catalog', component: CatalogOffersComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
