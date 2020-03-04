import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
interface Livraison{
    client_name: string,
    adresse: string,
    codePostal: bigint,
    ville: string
}
@Injectable()
export class LivraisonService implements Livraison{
    client_name: string;
    adresse: string;
    codePostal: bigint;
    ville: string;
   
    constructor(private http: HttpClient){}

    public getLivraisons(): Observable<Livraison[]> {
        return this.http.get<Livraison[]>('http://localhost:1337/livraisons')
    }

 
}
