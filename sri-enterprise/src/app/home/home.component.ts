import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { SearchState, SearchStore } from '../store/search.state';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  username: string = '';
  currentUser! : User
  searchState!: SearchState;

  userSubscription!: Subscription;
  storeSubscription!: Subscription;

  constructor(
    public homeService: HomeService,
    public searchStore: SearchStore
  ) {}

  ngOnInit() {
    this.storeSubscription = this.searchStore.$searchState.subscribe(
      (data: SearchState) => {
        this.searchState = data;
        //console.log(this.searchState.users);
      }
    );
  }

  getUser() {
    //console.log(this.username);
    return this.homeService
      .getUser(this.username)
      .subscribe((user: any) => {
        //console.log(this.username);
        //console.log(user);
        this.currentUser={
          id: this.searchState.users.length,
          searchTerm: this.username,
          errorMessage:(user.message)?'Search Result Not Found':null,
          avatar_url:user.avatar_url,
          name:user.name
        };
        //console.log(this.currentUser)
        this.searchState.users.push(this.currentUser);
        this.searchStore.updateState(this.searchState);
      });
  };

  ngOnDestroy() {
    // this.userSubscription.unsubscribe()
    this.storeSubscription.unsubscribe();
  }
}
