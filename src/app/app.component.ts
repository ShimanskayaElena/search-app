import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  inputValue: string;
  numberRequests: number;
  queryForm: FormGroup;

  constructor( public firebase: AngularFireDatabase) {}

  ngOnInit() {
    this.queryForm = new FormGroup({
      query: new FormControl('', [ Validators.required, Validators.maxLength(100)])
    });

    this.getItems();

    this.items.subscribe( items => this.numberRequests = items.length);
  }

  send(data: string): void {
    // get the number of milliseconds at the time of sending the request
    const time: number = new Date().getTime();
    // enter the parameter by which queries will be sorted
    const sorting: number = 1 / time;
    // Get the date and time the query was created in an easy-to-read format
    const dateString: string = this.getDateString(time);
   // save request to Firebase
    this.items.push({
      message: data,
      date: dateString,
      sorting: sorting
    });
    // clear input field
    this.inputValue = '';
  }

  delete(key: string): void {
    this.items.remove(key);
  }

  getItems(): Observable<any[]> {
    return this.items = this.firebase.list('/messages', {
      query: {
        orderByChild: 'sorting'
      }
    }) as FirebaseListObservable<any[]>;
  }

  getDateString(milliseconds: number): string {
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
