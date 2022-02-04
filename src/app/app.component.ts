import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.httpClient.post<{ name: string }>(
      'https://angular-tuto-http-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.httpClient.get<{ [key: string]: Post }>(
      'https://angular-tuto-http-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    ).pipe(map(responseData => {
      const postArray: Post[] = []; // transforme la réponse en tableau
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          // pour chaque élément, crée un objet avec les mêmes données (clé/valeur) + rajoute l'id unique
          postArray.push({ ...responseData[key], id: key });
        }
      }

      return postArray;
    }))
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
    });
  }
}
