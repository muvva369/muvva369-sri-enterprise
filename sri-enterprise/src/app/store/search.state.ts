import { User } from "../models/user.model";
import {BehaviorSubject, Observable, of } from 'rxjs'
import { Injectable } from "@angular/core";
import { StateService } from "../shared/state.service";
import { SearchResults } from "../data/searchresults.data";
import { LocalService } from "./local.service";

export interface SearchState{
    users:User[]
}

const initialState:SearchState={
    users:[]
}

@Injectable({
    providedIn:'root'
})
export class SearchStore extends StateService<SearchState>{

    $searchState : Observable<SearchState> = this.select(state=>state);

    constructor(private localService:LocalService){
        super(initialState);
        this.initialiseState()
    }
    
    initialiseState (){
        let initialstate= this.localService.getData('searchResults')
        this.updateState(initialstate)
    }
 
    updateState(newSearchState:SearchState){
        this.setState(newSearchState)
        this.localService.saveData('searchResults',newSearchState)
        // console.log(this.$searchState)
    }

    emptyState(){
        this.setState({})
    }

}