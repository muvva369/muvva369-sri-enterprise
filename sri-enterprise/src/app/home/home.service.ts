import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://api.github.com/users';

  constructor(private http:HttpClient) { }

  getUser(username: string): Observable<User> {
    const url = `${this.apiUrl}/${username}`;
    // console.log(url)
    return this.http.get<User>(url).pipe(
      tap((data:User)=>console.log(data)),
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse): Observable<any>{
    let errorMessage:{status:number,message:string,stack?:string|undefined}={
      status: 301,
      message: '',
      stack:''
    }
    if(error.error instanceof ErrorEvent){
      errorMessage ={status:500,message: `An Error Occured : ${error.error.message}`}
    }else{
      errorMessage={status:error.status,message:error.message}
    }
    return of(errorMessage)
  }
}
