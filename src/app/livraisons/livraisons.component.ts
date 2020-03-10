import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import {LivraisonService} from '../service/livraison.service';
import tt from '@tomtom-international/web-sdk-maps';
import * as tott from '@tomtom-international/web-sdk-services';

@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.component.html',
  styleUrls: ['./livraisons.component.css'],

})

export class LivraisonsComponent implements OnInit {
  public livraisons:{};
  public livraison: {};
  public routes = [];


  constructor( private livraisonService : LivraisonService) { }

  ngOnInit() {
    let sodifranceCoordinates = [ 2.3829006, 48.8282867 ];
    let routes = [];
    let livraisonsCoordinate = [];// certaines variables apparaissent comme inutilisée mais sont bien comprise par le sdk de l'api tomtom
    const routeWeight = 9;
    const routeBackgroundWeight = 12;
    let livraison: any;
    const LivraisonArray = new Array()

    const map = tt.map({
      key: 'Yt8tGzAdxUDcCyHTB9ygyJN5qZfoJIZT', 
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: sodifranceCoordinates,
      zoom: 14,
    });
  
  
   let addControl = map.addControl(new tt.FullscreenControl()); //bouton de controle de la map
    map.addControl(new tt.NavigationControl());

    let initCoord = LivraisonArray.push(sodifranceCoordinates);//(seras remplacé par la geoloc du livreur)
 

//===================================recuperation des livraisons et traitement des cooordonnées=========================
      //recuperation des livraisons et des coordonnées avec initialisation des marqueurs
 
   this.livraisonService.getLivraisons().subscribe( livraisons => {
     
   console.log('livraisons:', livraisons);

   if (livraisons){
     this.livraisons = livraisons
     for (  livraison of livraisons) {
      //on stock les nouvelles coordonnées dans un array au format voulu par l'api
      let livraisonsCoordinate = [livraison.longitude, livraison.latitude];
      let livLenght = LivraisonArray.push(livraisonsCoordinate);
    }
   }else{
     this.livraisons = []
   }
   //on génere les Markers 

   LivraisonArray.forEach ( function(element){
    new tt.Marker().setLngLat(element).addTo(map);
  });

  //recherche du layer (generation des routes ) cette fonction bug souvent et je ne sais pas pourquoi
  
  function findFirstBuildingLayerId() {
    const layers = map.getStyle().layers
    for (let index in layers) {
        if (layers[index].type === 'fill-extrusion') {
            return layers[index].id;
        }
    }

    throw new Error('Map style does not contain any layer with fill-extrusion type.');
}


   console.log('LivraisonArray:',LivraisonArray)

   tott.services.calculateRoute({
    batchMode: 'sync',
    key: 'Yt8tGzAdxUDcCyHTB9ygyJN5qZfoJIZT',
    locations:LivraisonArray ,
    traffic: false,
    computeBestOrder: true

  })
    .go()
    .then(function(response) {
      let geojson = response.toGeoJson();
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
    
})



}

}
