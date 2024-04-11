import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { OffersService } from '../offers/offer-services/offers.service';
import { UtilService } from '../app-services-utils/util.service';

@Injectable({
  providedIn: 'root',
})
export class isOwner implements CanActivate {
  constructor(private offerService: OffersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const offerId = next.paramMap.get('offerId');

    if (offerId) {
      return this.offerService.getOneOffer(offerId).pipe(
        map((data: any) => {
          const ownerId = data.owner.objectId;
          const currentUserId = UtilService.getUserData().userId;

          if (ownerId === currentUserId) {
            return true;
          } else {
            return this.router.createUrlTree(['/404']);
          }
        })
      );
    }

    return false;
  }
}




/* import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OffersService } from '../offers/offer-services/offers.service';
import { UtilService } from '../app-services-utils/util.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class isOwner implements CanActivate {
  constructor(private offerService: OffersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const offerId = next.paramMap.get('offerId');

    if (offerId) {
      return new Observable<boolean | UrlTree>((observer) => {
        this.offerService.getOneOffer(offerId).subscribe((data: any) => {
          const ownerId = data.owner.objectId;
          const currentUserId = UtilService.getUserData().userId;
          console.log('ownerId === currentUserId', ownerId === currentUserId);

          if (ownerId === currentUserId) {
            observer.next(true);
          } else {
            observer.next(this.router.createUrlTree(['/404']));
          }
          observer.complete();
        });
      });
    }

    return new Observable<boolean | UrlTree>((observer) => {
      observer.next(false);
      observer.complete();
    });
  }
} */


//--------------------------------------------------------------------
/* 
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { OffersService } from '../offers/offer-services/offers.service';
import { UtilService } from '../app-services-utils/util.service';

@Injectable({
  providedIn: 'root',
})
export class isOwner implements CanActivate {
  constructor(private offerService: OffersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
        const offerId = next.paramMap.get('offerId');

        if (offerId) {
          return this.offerService.getOneOffer(offerId).pipe(
            switchMap((data: any) => {
              const ownerId = data.owner.objectId;
              const currentUserId = UtilService.getUserData().userId;
    
              return ownerId === currentUserId ? of(true) : of(this.router.createUrlTree(['/404']));
            })
          );
        }
    
        return of(false);
  }
}



*/
