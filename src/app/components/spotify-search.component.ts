import {
  Component,
  Output,
  Input,
  EventEmitter,
  Injectable,
  ViewEncapsulation } from 'angular2/core';
import { Http, Response }           from 'angular2/http';
import { Control, FORM_DIRECTIVES } from 'angular2/common';
import { Observable }               from 'rxjs/Observable';
import { Observer }                 from 'rxjs/Observer';
import 'rxjs/Rx';

/**
 * The dumb component, search box that captures user input and emits searchEvent.
 */
@Component({
  selector:   'search-box',
  directives:  [ FORM_DIRECTIVES ],
  template: `<input [ngFormControl]="searchBox" placeholder="Search item">`
})
class SearchBox {

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  private searchBox: Control = new Control();

  constructor() {
    this.searchBox
      .valueChanges
      .debounceTime( 200 ) // Control delay. NOTE: import 'rxjs/Rx'
      .subscribe(
        ( event ) => this.searchEvent.emit( event )
      );
  }
}


/**
 * The dumb component, search result that accepts search results and displays them.
 * The result is coming in as an array of artist objects.
 * The async pipe maintains a subscription to results and keeps delivering values
 * as they arrive. As long as we push our data through the Observable stream,
 * our dumb component will display it.
 */
@Component({
  selector:   'search-result',  // <selector-name></selector-name>
  directives:  [ ],             // Register child components.
  template: `
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Popularity</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="#item of dataItems | async">
        <td>{{ item.name }}</td>
        <td>{{ item.popularity }}</td>
      </tr>
    </tbody>
  </table>
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
  loadItems( searchTerm ): Observable<Object[]> {
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
 * The smart component that controls the spotify-search functionality.
 * Uses the HTTP service to get search results and apply any transformations to
 * the data that we need.
 * Bound to the searchEvent output property in the search-box sub-component.
 */
@Component({
  selector: 'spotify-search-component',    // <selector-name></selector-name>
  directives: [ SearchBox, SearchResult ], // Register child components.
  providers:  [ SpotifySearchService ],    // Register services.
  encapsulation: ViewEncapsulation.Native, // Set ShadowDOM.
  styles: [ require('./spotify-search.component.css') ],
  template: `
  <search-box (searchEvent)="onSearch( $event )"></search-box>
  <hr>
  <search-result [dataItems]="data"></search-result>
  `
})
export class SpotifySearchComponent {

  private data: Observable<Object[]>;

  // Responsible for generating the values that will be emitted through the
  // Observable. We need an explicit reference to it in order to push new data
  // from HTTP requests, using next() method.
  private _dataObserver: Observer<Object[]>;

  constructor( private _http: Http,
               private _search: SpotifySearchService ) {
    this.data = new Observable(
      ( observer ) => {
        return this._dataObserver = observer;
      });
  }

  /**
   * Perform GET request to spotify API for artist data.
   * Invoked when user's input changes which are captured by search-box.
   */
  onSearch( searchTerm: string ) {
    this._search
      .loadItems( searchTerm )
      .subscribe(
        ( newResult ) => {
          // Push a new copy of result list to all Subscribers.
          // Reject if _dataObserver does not exist.
          return this._dataObserver ? this._dataObserver.next( newResult ) : null;
        },
        error => console.log( 'Could not load artists' ),
        ()    => console.log( 'Done loading artists' )
      );
  } // end search
}
