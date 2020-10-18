import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import { catchError , retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  getData(url: any): Observable<any> {
    return this.http.get<any>(url)
                    .pipe(
                      retry(1),
                      catchError(this.handleError)
                      );
  }
  postData(userData: any) {
    return this.http.post<any>('https://cs251-outlab-6.herokuapp.com/add_new_feedback/',userData)
                    .pipe(
                      retry(1),
                      catchError(this.handleError)
                    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
     // alert('Some network error occured on your side');
     return throwError(
        'Unable to get initial form value ; something bad happened on your side.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
     // console.error(
      //  `Backend returned code ${error.status}, ` +
       // `body was: ${error.error}`);
       return throwError(
        'Unable to get initial form value from server.');
    }
    // Return an observable with a user-facing error message
  }

}
