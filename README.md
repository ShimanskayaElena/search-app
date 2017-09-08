# SearchApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


TEST

It was necessary to create a search history storage application.

The user enters the query in the search bar and clicks "Find".

The application makes a request to the Firebase database (https://firebase.google.com/) and saves it
inquiry.

Below the search box, all user requests in the reverse order history are displayed
(downloaded the last request, then the penultimate, etc.).

The request is shown in the form "Date-time + query string".

The user can delete the query from the query history by clicking on the "Delete" button.

Requirements:

1. Input and submit with ReactiveForms. Validation for the input field (at least 1 character and not
more than 100).

2. Use Bootstrap 4 to make the layout.

3. The application must be run on the Framework Angular. To start the project, you must use Angular-cli.