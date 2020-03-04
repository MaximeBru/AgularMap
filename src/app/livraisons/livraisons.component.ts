import { Component, OnInit } from '@angular/core';
import {LivraisonService} from '../service/livraison.service';


@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.component.html',
  styleUrls: ['./livraisons.component.css']
})
export class LivraisonsComponent implements OnInit {
  public livraisons:{};
  public livraison: [];

  constructor( private livraisonService : LivraisonService) { }

  ngOnInit() {
    this.livraisonService.getLivraisons().subscribe( livraisons => {
     console.log('livraisons:',livraisons);
      if (livraisons){
        this.livraisons = livraisons
      }else{
        this.livraisons = []
      }
    })
  }

}
