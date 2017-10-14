webpackJsonp([2],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form {\r\n    margin-top: 2rem;\r\n}\r\n\r\n.delete {\r\n    margin-left: 5rem;\r\n}\r\n\r\n@media screen and (min-width: 1201px) {}\r\n\r\n@media screen and (max-width: 1200px) {\r\n    h3 {\r\n        color: grey;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 992px) {}\r\n\r\n@media screen and (max-width: 768px) {\r\n\r\n    h3 {\r\n        font-size: 20px;\r\n        font-weight: 600;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 576px) {\r\n    .delete {\r\n        margin-left: 2rem;\r\n    }\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  \n  <form class=\"row form-group\" [formGroup]=\"queryForm\" novalidate>\n    <div class=\"col-12 col-sm-12 col-md-3 col-lg-2\">\n      <label class=\"col-form-label\">I`m looking for</label>\n    </div>\n    <div class=\"col-8 col-md-7 col-lg-8\">\n      <input type=\"text\" class=\"form-control\" formControlName=\"query\" placeholder=\"Text of my search request\" [(ngModel)]=\"inputValue\">\n    </div>\n    <div class=\"col-2\">\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"send(queryForm.value.query)\">Find</button>\n    </div>\n    <div class=\"col-12\" *ngIf=\"queryForm.controls.query.invalid\">\n      <div *ngIf=\"queryForm.controls.query.errors.maxlength\" class=\"alert alert-danger\">\n        The number of characters entered must not exceed 100!\n      </div>\n    </div>\n  </form>\n\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <h3>Search history - {{numberRequests}} request(s)</h3>\n    </div>\n  </div>\n\n  <div class=\"row justify-content-center\" *ngFor=\"let item of items | async;  let i = index\">\n    <div class=\"col-10\">\n      {{item.date}}\n      <p>\n        {{item.message}}\n        <button type=\"button\" class=\"btn btn-secondary delete\" (click)=\"delete(item.$key)\">Delete</button>\n      </p>\n    </div>\n    <!--<div class=\"col-2\">\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"delete(item.$key)\">Delete</button>\n    </div>-->\n    <div class=\"col-12\">\n      <hr class=\"my-4\">\n    </div>  \n  </div>\n\n</div>\n\n\n<!--<input type=\"text\" id=\"message\" placeholder=\"What is it that you do?\" (keyup.enter)=\"send($event.target.value)\" [(ngModel)]=\"msgVal\" />-->\n<!--<div>Form value: {{queryForm.value.query | json}}</div>\n  <div>Form status: {{queryForm.status | json }}</div>-->"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(firebase) {
        this.firebase = firebase;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queryForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            query: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(100)])
        });
        this.getItems();
        this.items.subscribe(function (items) { return _this.numberRequests = items.length; });
    };
    AppComponent.prototype.send = function (data) {
        // get the number of milliseconds at the time of sending the request
        var time = new Date().getTime();
        // enter the parameter by which queries will be sorted
        var sorting = 1 / time;
        // Get the date and time the query was created in an easy-to-read format
        var dateString = this.getDateString(time);
        // save request to Firebase
        this.items.push({
            message: data,
            date: dateString,
            sorting: sorting
        });
        // clear input field
        this.inputValue = '';
    };
    AppComponent.prototype.delete = function (key) {
        this.items.remove(key);
    };
    AppComponent.prototype.getItems = function () {
        return this.items = this.firebase.list('/messages', {
            query: {
                orderByChild: 'sorting'
            }
        });
    };
    AppComponent.prototype.getDateString = function (milliseconds) {
        var date = new Date(milliseconds);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var time = new Date(year, month, day, hours, minutes);
        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric'
        };
        return time.toLocaleString('ru', options);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["b" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["b" /* AngularFireDatabase */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var firebaseConfig = {
    apiKey: 'AIzaSyD7w9LMIAisBI-Rmne6E89n6qRJNRL93aI',
    authDomain: 'searchapp-30379.firebaseapp.com',
    databaseURL: 'https://searchapp-30379.firebaseio.com',
    storageBucket: 'searchapp-30379.appspot.com',
    messagingSenderId: '133227927960'
};

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuthModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map