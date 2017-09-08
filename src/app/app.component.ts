import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  inputValue = '';

  queryForm: FormGroup = new FormGroup({
    query: new FormControl('', [ Validators.required, Validators.maxLength(100)])
  });

  constructor( public firebase: AngularFireDatabase) {
    this.getItems();
  }

  send(data: string) {
    // get the number of milliseconds at the time of sending the request
    const time = new Date().getTime();
    // enter the parameter by which queries will be sorted
    const sorting = 1 / time;
    // Get the date and time the query was created in an easy-to-read format
    const dateString = this.getDateString(time);
   // save request to Firebase
    this.items.push({
      message: data,
      date: dateString,
      sorting: sorting
    });
    // clear input field
    this.inputValue = '';
  }

  delete(key) {
    this.items.remove(key);
  }

  getItems() {
    this.items = this.firebase.list('/messages', {
      query: {
        orderByChild: 'sorting'
      }
    }) as FirebaseListObservable<any[]>;
  }

  getDateString(milliseconds) {
    const date = new Date(milliseconds);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = new Date(year, month, day, hours, minutes);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric'
    };
    return time.toLocaleString('ru', options);
  }
}
