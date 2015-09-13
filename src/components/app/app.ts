/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {NavBar} from '../navbar/navbar';

// Annotation section
@Component({
  selector: 'hellianthus-app'
})

@View({
    directives: [NavBar],
    templateUrl: 'components/app/app.html'
})

// Component controller
export class App {
  name: string;

  constructor() {
    this.name = 'Alice';
  }
}
