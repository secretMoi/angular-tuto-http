import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.httpClient.post(
      'https://angular-tuto-http-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData
    )
      .pipe(map(responseData => {
        const postArray = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }

        return postArray;
      }))
      .subscribe(responseData => {
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
    this.httpClient.get(
      'https://angular-tuto-http-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    ).pipe(map(responseData => {
      const postArray = []; // transforme la réponse en tableau
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          // pour chaque élément, crée un objet avec les mêmes données (clé/valeur) + rajoute l'id unique
          postArray.push({ ...responseData[key], id: key });
        }
      }

      return postArray;
    }))
      .subscribe(posts => {
      console.log(posts);
    });
  }
}
