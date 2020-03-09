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
import { LivraisonService } from '../service/livraison.service';
import tt from '@tomtom-international/web-sdk-maps';
import * as tott from '@tomtom-international/web-sdk-services';
var LivraisonsComponent = /** @class */ (function () {
    function LivraisonsComponent(livraisonService) {
        this.livraisonService = livraisonService;
        this.routes = [];
    }
    LivraisonsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sodifranceCoordinates = [2.3829006, 48.8282867];
        var routes = [];
        var map = tt.map({
            key: 'Yt8tGzAdxUDcCyHTB9ygyJN5qZfoJIZT',
            container: 'map',
            style: 'tomtom://vector/1/basic-main',
            center: sodifranceCoordinates,
            zoom: 9
        });
        var firstMarker = new tt.Marker().setLngLat(sodifranceCoordinates).addTo(map);
        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
        //===================================recuperation des livraisons et traitement des cooordonnées=========================
        //recuperation des livraisons et des coordonnées avec initialisation des marqueurs
        var livraisonsCoordinate = [];
        var routeWeight = 9;
        var routeBackgroundWeight = 12;
        var livraison;
        var LivraisonArray = new Array();
        this.livraisonService.getLivraisons().subscribe(function (livraisons) {
            console.log('livraisons:', livraisons);
            if (livraisons) {
                _this.livraisons = livraisons;
                for (var _i = 0, livraisons_1 = livraisons; _i < livraisons_1.length; _i++) {
                    livraison = livraisons_1[_i];
                    //on stock les nouvelles coordonnées dans un array au format voulu par l'api
                    var livraisonsCoordinate_1 = [livraison.longitude, livraison.latitude];
                    var livLenght = LivraisonArray.push(livraisonsCoordinate_1);
                    //on génere les marquer (la variable apparait comme inutilisée mais est bien comprise par le sdk de l'api tomtom)
                    var livraisonMarker = new tt.Marker().setLngLat(livraisonsCoordinate_1).addTo(map); // on 
                }
            }
            else {
                _this.livraisons = [];
            }
            //add layer fonction
            function findFirstBuildingLayerId() {
                var layers = map.getStyle().layers;
                for (var index in layers) {
                    if (layers[index].type === 'fill-extrusion') {
                        return layers[index].id;
                    }
                }
                throw new Error('Map style does not contain any layer with fill-extrusion type.');
            }
            console.log('LivraisonArray:', LivraisonArray);
            tott.services.calculateRoute({
                batchMode: 'sync',
                key: 'Yt8tGzAdxUDcCyHTB9ygyJN5qZfoJIZT',
                locations: LivraisonArray
            })
                .go()
                .then(function (response) {
                console.log(response.toGeoJson());
                var geojson = response.toGeoJson();
                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': {
                        'type': 'geojson',
                        'data': geojson
                    },
                    'paint': {
                        'line-color': '#4a90e2',
                        'line-width': 9
                    }
                }, findFirstBuildingLayerId());
            });
        });
        //=============================== code des destinations de livraisons ===================================================
        // if points have been added while we are waiting for the response we request the route again
        //-
    };
    LivraisonsComponent = __decorate([
        Component({
            selector: 'app-livraisons',
            templateUrl: './livraisons.component.html',
            styleUrls: ['./livraisons.component.css'],
        }),
        __metadata("design:paramtypes", [LivraisonService])
    ], LivraisonsComponent);
    return LivraisonsComponent;
}());
export { LivraisonsComponent };
//# sourceMappingURL=livraisons.component.js.map