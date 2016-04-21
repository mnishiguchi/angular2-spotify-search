import { Http }                                   from 'angular2/http';
import { Component, Output, Input, EventEmitter } from 'angular2/core';
import { Control, FORM_DIRECTIVES }               from 'angular2/common';
import { Observable } from 'rxjs/Observable';
import { Observer }   from 'rxjs/Observer';


/**
 * The search box.
 */
@Component({
  selector:   'search-box',
  directives:  [ FORM_DIRECTIVES ],
  template: `<input [ngFormControl]="searchBox" placeholder="Search item">`
})
class SearchBox {

  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  private searchBox: Control = new Control();

  constructor() {
    this.searchBox.valueChanges.subscribe( ( event ) =>
      this.valueChanged.emit( event )
    );
  }
}


/**
 * The search result textbox.
 */
@Component({
  selector:   'search-result',  // <selector-name></selector-name>
  directives:  [ ],             // Register child components.
  template: ` <div *ngFor="#item of dataItems | async">
                {{ item.name }} ({{ item.popularity }})
              </div>
  `
})
class SearchResult {
  @Input() dataItems: Observable<any>;
  constructor() { }
}


/**
 * The wrapper component of the spotify-search functionality.
 */
@Component({
  selector: 'spotify-search-component',    // <selector-name></selector-name>
  directives: [ SearchBox, SearchResult ], // Register child components.
  template: `
  <search-box (valueChanged)="handleChange( $event )"></search-box>
  <hr>
  <search-result [dataItems]="data"></search-result>
  `
})
export class SpotifySearchComponent {
  private data: Observable<any>;
  private dataObserver: Observer<any>;

  constructor( private _http: Http ) {
    this.data = new Observable( observer => this.dataObserver = observer );
  }

  handleChange( searchTerm ) {
    // Reject if the search term is empty, else prepare a request URL.
    if ( ! searchTerm ) { return; }
    let url = 'https://api.spotify.com/v1/search?q=' + searchTerm + '&type=artist';

    // GET, convert the result to json and subscribe for changes.
    this._http.get( url ).map(( response ) => {
      let artists = response.json().artists;
      return artists.items;
   }).subscribe( result => {
     this.dataObserver.next( result );
   }, error => console.log( 'Could not load artists' ) );
  }
}
