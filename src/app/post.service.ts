import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>();

  private url: string = 'https://angular-tuto-http-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

  constructor(private httpClient: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};

    this.httpClient.post<{ name: string }>(this.url, postData, {
      observe: 'response' //body, events
    })
      .subscribe(responseData => console.log(responseData),
        error => this.error.next(error.message)
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.httpClient.get<{ [key: string]: Post }>(this.url, {
      headers: new HttpHeaders({
        'Custom-Header': 'Hello'
      }),
      params: searchParams,
      responseType: 'json'
    })
        .pipe(map(responseData => {
          const postArray: Post[] = []; // transforme la réponse en tableau
          for(const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              // pour chaque élément, crée un objet avec les mêmes données (clé/valeur) + rajoute l'id unique
              postArray.push({ ...responseData[key], id: key });
            }
          }

          return postArray;
      }),
        catchError(errorResponse => {
          return throwError(errorResponse)
        })
      );
  }

  deletePosts() {
    return this.httpClient.delete(this.url, {
      observe: 'events',
      responseType: 'text'
    }).pipe(
      tap(
        event => {
          if(event.type === HttpEventType.Sent) {
            // ...
          }
          if(event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        }
      )
    );
  }
}
