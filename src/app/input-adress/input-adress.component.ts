import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import places from 'places.js';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

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

  public innerValue = {
    address: '',
    lat: 0.00,
    lng: 0.00
  };

  @ViewChild('ref', { static: true }) public el: ElementRef;


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
      }
    });
  }

}








