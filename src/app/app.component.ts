import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  private errorSubscription: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(
      errorMessage => this.error = errorMessage
    );

    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(
      () => this.loadedPosts = [],
      error => this.error = error.message
    );
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
