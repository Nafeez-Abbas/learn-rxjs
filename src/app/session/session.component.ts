import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Anatomy of an observable

  // 1) Create
  // Using constructor - takes a function as argument.

  // Using creation functions.


  // 2) Subscribe

  // 3) Execute - 3 notifications 

  // 4) Dispose

  // ----------------------------------------------------------------------------------------

  // Operators

  // 1) Creation
  // from - Creates an Observable from an Array, an array-like object, a String, a Promise, an iterable object


  // fromEvent - emits events of a specific type coming from the given event target.


  // interval - emits sequential numbers every specified interval of time


  // of - Converts the arguments to an observable sequence.


  // range - Creates an Observable that emits a sequence of numbers within a specified range.


  // timer
  // time to wait before starting the interval

  // delay between each value emitted in the interval.


  // iif - expects a function that returns a boolean (the condition function), and two sources, the trueResult and the falseResult, and returns an Observable.


  // ---------------------------------------------------------------------

  // 2) Join creation
  // combineLatest - emit only the latest values from multiple observable sources


  // concat - Creates an output Observable which sequentially emits all values from the first given Observable and then moves on to the next.


  // merge - Creates an output Observable which concurrently emits all values from every given input Observable.


  // zip - Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.



  // -----------------------------------------------------------------------

  // When Pipeable Operators are called, they do not change the existing Observable instance. 
  // Instead, they return a new Observable, whose subscription logic is based on the first Observable.

  // pipe - execute multiple rxjs operators, returns an observable

  // 3) Filtering

  // debounceTime - delays notifications emitted by the source Observable


  // distinct

  // distinct with keySelector 
  /** keySelector - Optional function to select which value you want to check as distinct.  */ 


  // distinctUntilChanged - distinct in comparison to the last value the result observable emitted.


  // elementAt


  // filter - Like Array.prototype.filter(), it only emits a value from the source if it passes a criterion function.


  // first, last


  // skip, skipLast


  // skipWhile


  // take, takeLast


  // throttleTime - emits the source Observable values on the output Observable when its internal timer 
  // is disabled, and ignores source values when the timer is enabled. Initially, the timer is disabled. 
  // As soon as the first source value arrives, it is forwarded to the output Observable, and then the timer is enabled


  // --------------------------------------------------------------

  // 4) Error handling

  // catchError
  /** new error */


  // retry


  // --------------------------------------------------------------------

  // 5) Mathematical
  // count, max, min


  // reduce - Like Array.prototype.reduce()


  // --------------------------------------------------------------------------------

  // 6) Conditional

  // find, findIndex


  // every - emits whether or not every item of the source satisfies the condition specified.


  // ---------------------------------------------------------------

}
