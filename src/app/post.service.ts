import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = 'https://angular-tuto-http-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

  constructor(private httpClient: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};

    this.httpClient.post<{ name: string }>(this.url, postData)
      .subscribe(responseData => {
      console.log(responseData);
    });
  }

  fetchPosts() {
    return this.httpClient.get<{ [key: string]: Post }>(this.url)
      .pipe(map(responseData => {
        const postArray: Post[] = []; // transforme la réponse en tableau
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            // pour chaque élément, crée un objet avec les mêmes données (clé/valeur) + rajoute l'id unique
            postArray.push({ ...responseData[key], id: key });
          }
        }

        return postArray;
    }));
  }
}
