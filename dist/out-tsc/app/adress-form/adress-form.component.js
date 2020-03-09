var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LivraisonService } from '../service/livraison.service';
var AdressFormComponent = /** @class */ (function () {
    function AdressFormComponent(fb, livraisonService) {
        this.fb = fb;
        this.livraisonService = livraisonService;
    }
    AdressFormComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            name: [''],
            address: [{
                    address: '78 Rue du Moulin Vert, Paris 14e Arrondissement, Île-de-France, France',
                    lat: 48.8304,
                    lng: 2.32209
                }]
        });
    };
    AdressFormComponent = __decorate([
        Component({
            selector: 'app-adress-form',
            templateUrl: './adress-form.component.html',
            styleUrls: ['./adress-form.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, LivraisonService])
    ], AdressFormComponent);
    return AdressFormComponent;
}());
export { AdressFormComponent };
//# sourceMappingURL=adress-form.component.js.map