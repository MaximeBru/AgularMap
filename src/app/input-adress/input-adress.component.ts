import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import places from 'places.js';

@Component({
  selector: 'app-input-adress',
  templateUrl: './input-adress.component.html',
  styleUrls: ['./input-adress.component.css']
})


export class InputAdressComponent implements OnInit, AfterViewInit {
  private autocomplete;
  public innerValue = {
    address: '',
    lat: 0.00,
    lng: 0.00
  };

  @ViewChild('ref', { static: true }) public el: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.autocomplete = places({
      appId: 'pl4R2GKC8AAF',
      apiKey: 'cda64dc3716979d149b438049e189dda',
      container: this.el.nativeElement
    });

    this.autocomplete.on('change', e => {
      if (e.suggestion) {
        this.innerValue.lat = e.suggestion.latlng.lat;
        this.innerValue.lng = e.suggestion.latlng.lng;
        this.innerValue.address = e.suggestion.value;
      }
    });
  }

}








