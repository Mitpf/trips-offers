import { Component, OnInit } from '@angular/core';
import { GlobalLoaderService } from './global-loader.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css'],
})
export class GlobalLoaderComponent implements OnInit {

constructor(private globLoadingService:GlobalLoaderService){}

  isLoading: boolean = false;

  ngOnInit(): void {
    this.globLoadingService.isLoading$.subscribe(
      (stateLoading:boolean)=>{this.isLoading=stateLoading}
    )
  }


}
