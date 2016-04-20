import { Http }       from 'angular2/http';
import { Component }  from 'angular2/core';
import { Input, Output, EventEmitter } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer }   from 'rxjs/Observer';
import { SearchBox }  from './search-box.component';

@Component({
  selector: 'spotify-search-component',
  directives: [ SearchBox ],
  template: `<search-box (valueChanged)="onSearch( $event )"
                         [dataItems]="data"></search-box>
  `
})

export class Search {
  private data: Observable<any>;
  private dataObserver: Observer<any>;

  constructor( private _http: Http ) {
    this.data = new Observable( observer => this.dataObserver = observer );
  }

  onSearch( event ) {

    // Reject if the search term is empty, else prepare a request URL.
    if ( ! event ) { return; }
    let url = 'https://api.spotify.com/v1/search?q=' + event + '&type=artist';

    // GET, convert the result to json and subscribe for changes.
    this._http.get( url ).map(( response ) => {
      let artists = response.json();
      return artists.artists.items;
   }).subscribe( result => {
     this.dataObserver.next(result);
   }, error => console.log( 'Could not load artists' ));
  }
}
