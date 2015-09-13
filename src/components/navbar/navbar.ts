/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'navbar'
})

@View({
  templateUrl: 'components/navbar/navbar.html'
})

// Component controller
export class NavBar {

  constructor() {
  }
}
