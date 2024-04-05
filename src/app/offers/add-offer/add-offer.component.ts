import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractFormGroupDirective, FormBuilder } from '@angular/forms';
import { UtilService } from '../../app-services-utils/util.service';
import { OffersService } from '../offers.service';
import { InputDataOffer } from '../types';



@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private offerService: OffersService
  ) {}

  userId: string = '';
  ngOnInit(): void {
    this.userId = UtilService.getUserData().userId;
  }

  form = this.fb.group({
    name: [' '],
    destination: [' '],
    imglink: [' '],
    description: [' '],
    minpeople: [0],
    maxpeople: [0],
    price: [0],
    date: ['0000000'],
  });

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMMM yyyy') || '';
  }

  addOffer() {
    if (this.form.invalid) {
      return;
    }

  this.offerService.addOffer(this.form.value as InputDataOffer);
    
  }

  /* -- - - - */
}
