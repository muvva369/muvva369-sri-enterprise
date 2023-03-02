import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { LocalService } from '../store/local.service';
import { SearchState, SearchStore } from '../store/search.state';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnDestroy {

  searchState!: SearchState;
  stateLength:number=0

  storeSubscription!:Subscription

  constructor(public searchStore:SearchStore,public localService:LocalService){
  }
  
  ngOnInit(){
    this.storeSubscription = this.searchStore.$searchState.subscribe(
      (data: SearchState) => {
        this.searchState = data;
        this.stateLength=data.users.length
        //console.log(this.stateLength);
      }
    );
  }

  removeLocalStorage = () => {
    // this.searchStore.clearLocalStorage()
    this.localService.clearData()
    this.searchState.users=[]
    this.searchStore.updateState(this.searchState)
  }



  ngOnDestroy(){
    this.storeSubscription.unsubscribe()
  }
}
