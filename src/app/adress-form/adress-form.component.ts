import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LivraisonService} from '../service/livraison.service';

@Component({
  selector: 'app-adress-form',
  templateUrl: './adress-form.component.html',
  styleUrls: ['./adress-form.component.css']
})
export class AdressFormComponent implements OnInit {
  public form: FormGroup;
  public livraisons:{};
  public livraison: [];
  adress: any;

  constructor(public fb: FormBuilder, private livraisonService : LivraisonService) {}


  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      address:[{
        address: '78 Rue du Moulin Vert, Paris 14e Arrondissement, Île-de-France, France',
        lat: 48.8304,
        lng: 2.32209
      }]
    });
  }
 // public addLivraison(){
   // this.livraisons.post({adress:this.adress});
    //this.livraisonService.createLivraisons(this.livraisons)
  //}
}
