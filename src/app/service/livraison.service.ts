import {Injectable} from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class LivraisonService{
    public livraisons:{};
    public livraison: [];
    constructor(private http: HttpClient){}
    public getLivraisons(){
        return this.http.get<{livraisons: string}[]> ('http://localhost:1337/livraisons')
    }
    public createLivraisons(livraisons: {client_name:string}[]){
        return this.http.post('http://localhost:1337/livraisons', livraisons);
    }
}