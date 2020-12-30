import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import {User} from './model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  constructor(private _http:HttpClient) { }
    public url = "https://jsonplaceholder.typicode.com/posts";

    getDataFromServer():Observable<User[]>{
      return this._http.get<User[]>(this.url)
      .pipe(
        catchError(this.errorHandler)
      )
    }
    
    errorHandler(error:HttpErrorResponse){
      return throwError(error.message);
    }

}
