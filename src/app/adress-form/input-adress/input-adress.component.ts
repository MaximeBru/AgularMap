import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import places from 'places.js';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-input-adress',
  templateUrl: './input-adress.component.html',
  styleUrls: ['./input-adress.component.css'],
  providers: [{

    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef( () => InputAdressComponent )

  }]
})


export class InputAdressComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  private onChange;
  private onTouched;
  private autocomplete;
  public map;

  public innerValue = {
    address: '',
    lat: 0.00,
    lng: 0.00
  };

  @ViewChild('ref', { static: true }) public el: ElementRef;
  @ViewChild('map', { static: true }) public mapEl: ElementRef;

  constructor() { }
  writeValue(value){
    console.log(value);
    this.innerValue= value;
  }
  registerOnChange(fn){
    this.onChange = fn;
  }
  registerOnTouched(fn){
    this.onTouched = fn ;
  }
  ngOnInit() {
  }
  setDisabledState(disabled: boolean){}

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
        this.onChange(this.innerValue);
        this.addMarker();
      }
    });


    this.map = leaflet.map(this.mapEl.nativeElement);
    if (this.innerValue.lat) {
      this.addMarker();
    } else {
      this.map.setView([48.864716, 2.349014], 13);
    }
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

  }
  private addMarker() {
    const coord: [number, number] = [ this.innerValue.lat, this.innerValue.lng ];
    leaflet.marker(coord).addTo(this.map);
    this.map.setView(coord, 13);
  }


}







    






