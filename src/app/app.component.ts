import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const config = {
      apiKey: 'AIzaSyAlSDqlndBBwyaTaImJDRImhR41tsFMS7U',
      authDomain: 'recipe-book-351fa.firebaseapp.com'
    };
    firebase.initializeApp(config);
  }
}
