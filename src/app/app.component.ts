/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router}          from 'angular2/router';

import {Home}         from './home';
import {AppState}     from './app.service';
import {RouterActive} from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector:      'app',
  pipes:         [ ],
  providers:     [ ],
  directives:    [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require( 'normalize.css' ),
    require( 'app/app.component.css' )
   ],
  templateUrl: 'app/app.component.html'
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home }
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
])
export class App {
  public name = 'Angular 2 Spotify Search Using Observables';
  public url  = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log( 'Initial App State', this.appState.state );
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
