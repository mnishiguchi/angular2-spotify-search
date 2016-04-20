import { Control, FORM_DIRECTIVES }               from 'angular2/common';
import { Component, Output, Input, EventEmitter } from 'angular2/core';
import { Observable }                             from 'rxjs/Observable';

@Component({
  selector:   'search-box',
  directives:  [ FORM_DIRECTIVES ],
  template: `
    <input [ngFormControl]="searchBox" placeholder="Search item">

    <div *ngFor="#item of dataItems | async">
      {{ item.name }} ({{ item.popularity }})
    </div>
  `
})
export class SearchBox {

  @Input() dataItems: Observable<any>;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  private searchBox: Control = new Control();

  constructor() {
    this.searchBox.valueChanges.subscribe( ( event ) =>
      this.valueChanged.emit( event )
    );
  }
}
