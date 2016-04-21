import { Component, Output, Input, EventEmitter, Injectable } from 'angular2/core';
import { Http, Response }           from 'angular2/http';
import { Control, FORM_DIRECTIVES } from 'angular2/common';
import { Observable }               from 'rxjs/Observable';
import { Observer }                 from 'rxjs/Observer';


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
 * Define SpotifySearchService.
 */
@Injectable()
class SpotifySearchService {

  // A base url for spotify artist search.
  private baseUrl = 'https://api.spotify.com/v1/search?type=artist';

  private dataObserver: Observer<Response>;

  // Inject Http service.
  constructor( private _http: Http ) { }

  /**
   * @return {string} A Spotify URL for artist search with the specified term.
   */
  buildUrl( searchTerm ) {
    return this.baseUrl + '&q=' + searchTerm;
  };

  /**
   * Load items by performing search based on the specified search term.
   */
  loadItems( searchTerm ) {
    // GET, convert the response to json and extract required data from it.
    return this._http
      .get( this.buildUrl( searchTerm ) )
      .map(
        ( res: Response ) => {
          let data = res.json();
          // If data exists extract items, else [].
          return data ? data.artists.items : [];
        });
  } // end loadItems
}

/**
 * The wrapper component of the spotify-search functionality.
 */
@Component({
  selector: 'spotify-search-component',    // <selector-name></selector-name>
  directives: [ SearchBox, SearchResult ], // Register child components.
  providers:  [ SpotifySearchService ],
  template: `
    <search-box (valueChanged)="search( $event )"></search-box>
    <hr>
    <search-result [dataItems]="data"></search-result>
    `
})
export class SpotifySearchComponent {
  private data: Observable<Response>;
  private dataObserver: Observer<Response>;

  constructor( private _http: Http,
               private _search: SpotifySearchService ) {
    this.data = new Observable( observer => this.dataObserver = observer );
  }

  /**
   * Perform GET request to spotify API for artist data.
   * Invoked when user's input changes.
   */
  search( searchTerm: string ) {
    this._search
      .loadItems( searchTerm )
      .subscribe(
        ( res: Response ) => { this.dataObserver.next( res ); },
        error => console.log( 'Could not load artists' ),
        ()    => console.log( 'Done loading artists' )
    );
  } // end search
}
