var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, forwardRef } from '@angular/core';
import places from 'places.js';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as leaflet from 'leaflet';
var InputAdressComponent = /** @class */ (function () {
    function InputAdressComponent() {
        this.innerValue = {
            address: '',
            lat: 0.00,
            lng: 0.00
        };
    }
    InputAdressComponent_1 = InputAdressComponent;
    InputAdressComponent.prototype.writeValue = function (value) {
        console.log(value);
        this.innerValue = value;
    };
    InputAdressComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    InputAdressComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    InputAdressComponent.prototype.ngOnInit = function () {
    };
    InputAdressComponent.prototype.setDisabledState = function (disabled) { };
    InputAdressComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.autocomplete = places({
            appId: 'pl4R2GKC8AAF',
            apiKey: 'cda64dc3716979d149b438049e189dda',
            container: this.el.nativeElement
        });
        this.autocomplete.on('change', function (e) {
            if (e.suggestion) {
                _this.innerValue.lat = e.suggestion.latlng.lat;
                _this.innerValue.lng = e.suggestion.latlng.lng;
                _this.innerValue.address = e.suggestion.value;
                _this.onChange(_this.innerValue);
                _this.addMarker();
            }
        });
        this.map = leaflet.map(this.mapEl.nativeElement);
        if (this.innerValue.lat) {
            this.addMarker();
        }
        else {
            this.map.setView([48.864716, 2.349014], 13);
        }
        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    };
    InputAdressComponent.prototype.addMarker = function () {
        var coord = [this.innerValue.lat, this.innerValue.lng];
        leaflet.marker(coord).addTo(this.map);
        this.map.setView(coord, 13);
    };
    var InputAdressComponent_1;
    __decorate([
        ViewChild('ref', { static: true }),
        __metadata("design:type", ElementRef)
    ], InputAdressComponent.prototype, "el", void 0);
    __decorate([
        ViewChild('map', { static: true }),
        __metadata("design:type", ElementRef)
    ], InputAdressComponent.prototype, "mapEl", void 0);
    InputAdressComponent = InputAdressComponent_1 = __decorate([
        Component({
            selector: 'app-input-adress',
            templateUrl: './input-adress.component.html',
            styleUrls: ['./input-adress.component.css'],
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: forwardRef(function () { return InputAdressComponent_1; })
                }]
        }),
        __metadata("design:paramtypes", [])
    ], InputAdressComponent);
    return InputAdressComponent;
}());
export { InputAdressComponent };
//# sourceMappingURL=input-adress.component.js.map