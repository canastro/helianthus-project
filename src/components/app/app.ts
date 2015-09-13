/// <reference path="../../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {NavBar} from '../navbar/navbar';
import {Home} from '../home/home';

// Annotation section
@Component({
  selector: 'hellianthus-app'
})

@View({
    templateUrl: 'components/app/app.html',
    directives: [Home, NavBar]
})

// Component controller
export class App {
  name: string;

  constructor() {
    this.name = 'Alice';
  }
}
