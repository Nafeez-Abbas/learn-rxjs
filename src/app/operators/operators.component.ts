import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, catchError, combineLatest, concat, count, debounceTime, distinct, 
  distinctUntilChanged, elementAt, every, filter, find, findIndex, first, from, 
  fromEvent, iif, interval, last, map, max, merge, min, of, pipe, range, reduce, 
  retry, skip, skipLast, skipWhile, take, takeLast, throttleTime, timer, zip } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  // When Pipeable Operators are called, they do not change the existing Observable instance. 
  // Instead, they return a new Observable, whose subscription logic is based on the first Observable.

  // Categories of operators
  // 1) Creation
  // from - Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.
  usingFromArray = from([1, 2, 3]);
  usingFromString = from("Hi");
  triggerUsingFrom() {
    console.log('Using from - array')
    this.usingFromArray.subscribe(
      x => console.log(x)
    );
    console.log('Using from - string')
    this.usingFromString.pipe(map((a) => a.toUpperCase())).subscribe(
      x => console.log(x)
    );
  }

  // fromEvent - emits events of a specific type coming from the given event target.
  usingFromEvent = fromEvent(document, 'click');
  triggerFromEvent() {
    this.usingFromEvent.subscribe(
      x => console.log(x)
    );
  }

  // interval - emits sequential numbers every specified interval of time
  usingInterval = interval(500 /** interval size in milliseconds  */ );
  triggerInterval() {
    const subscription = this.usingInterval.subscribe(
      x => console.log(x)
    );
    setTimeout(() => {
      subscription.unsubscribe();
    }, 2000)
  }

  // of - Converts the arguments to an observable sequence.
  usingOf = of(1, 2 /** comma separated list of arguments you want to be emitted. */);

  // range - Creates an Observable that emits a sequence of numbers within a specified range.
  usingRange = range(1, 5);
  triggerRange() {
    this.usingRange.subscribe(
      x => console.log(x)
    );
  }

  // timer
  triggerTimer() {
    // timer(3000 /** time to wait before starting the interval */ ).subscribe(console.log);
    // timer(0, 2000 /** delay between each value emitted in the interval. */).subscribe(console.log);
  }

  // iif - expects a function that returns a boolean (the condition function), and two sources, the trueResult and the falseResult, and returns an Observable.
  triggerIif() {
    let v: boolean;
    let usingiif =  iif(
      () => v, of('first'), of('second')
    );

    v = false;
    usingiif.subscribe(console.log);
    v = true;
    usingiif.subscribe(console.log);
  }

  // 2) Join creation operators
  // combineLatest - emit only the latest values from multiple observable sources

  obs1 = timer(0, 1000);
  obs2 = timer(500, 1000);
  usingCL = combineLatest([this.obs1, this.obs2]);
  triggerCL() {
    const subscription = this.usingCL.subscribe(console.log);
    setTimeout(() => {
      subscription.unsubscribe();
    }, 5000);
  }

  // concat - Creates an output Observable which sequentially emits all values from the first given Observable and then moves on to the next.
  triggerConcat() {
    let obs1 = range(1, 5);
    concat(obs1, obs1).subscribe(console.log);
  }


  // merge - Creates an output Observable which concurrently emits all values from every given input Observable.
  triggerMerge() {
    let clickObs = fromEvent(document, 'click');
    let intervalObs = interval(1000);
    // merge(clickObs, intervalObs).subscribe(console.log);
  }

  // zip - Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.
  triggerZip() {
    const age$ = of(27, 25, 29);
    const name$ = of('Foo', 'Bar', 'Beer');
    const isDev$ = of(true, true, false);

    // zip(age$, name$, isDev$).pipe(
    //   map(([age, name, isDev]) => ({ age, name, isDev }))
    // )
    // .subscribe(x => console.log(x));
    zip(age$, name$, isDev$).subscribe(console.log);
  }

  // 3) Transformation
  // map - Like Array.prototype.map(), it passes each source value through a transformation function to get corresponding output values.
  triggerMap() {
    of(1, 2, 3).pipe(map((x) => x * 10)).subscribe(console.log);
  }


  // 4) Filtering
  // debounceTime - delays notifications emitted by the source Observable
  triggerDT() {
    fromEvent(document, 'click').pipe(debounceTime(1000)).subscribe(console.log);
  }

  // distinct
  triggerDistinct() {
    of(1, 2, 3, 1, 5, 3, 4, 2).pipe(distinct()).subscribe(console.log);

    of(
      { age: 4, name: 'Foo'},
      { age: 7, name: 'Bar'},
      { age: 5, name: 'Foo'}
    ).pipe(distinct(({ name }) => name) /** keySelector - Optional function to select which value you want to check as distinct.  */ )
    .subscribe(console.log);
  }

  // distinctUntilChanged - distinct in comparison to the last value the result observable emitted.
  triggerDUC() {
    of(1, 1, 1, 2, 2, 2, 1, 1, 3, 3)
      .pipe(distinctUntilChanged())
      .subscribe(console.log);
  }

  // elementAt
  triggerElementAt() {
    from([1, 2, 4, 3]).pipe(elementAt(2)).subscribe(console.log);
  }

  // filter - Like Array.prototype.filter(), it only emits a value from the source if it passes a criterion function.
  triggerFilter() {
    from([1, 2, 3, 4, 5, 6]).pipe(filter((x) => x%2 !== 0 )).subscribe(console.log);
  }

  // first, last
  triggerFirst() {
    from([1, 2, 3, 4, 5, 6]).pipe(first()).subscribe(console.log);
  }

  // skip, skipLast
  triggerSkip() {
    from([1, 2, 3, 4, 5, 6]).pipe(skipLast(2)).subscribe(console.log);
  }

  // skipWhile
  triggerSkipWhile() {
    from([1, 2, 3, 4, 5, 6]).pipe(skipWhile((x) => x !== 2 )).subscribe(console.log);
  }

  // take, takeLast
  triggerTake() {
    from([1, 2, 3, 4, 5, 6]).pipe(takeLast(2)).subscribe(console.log);
  }

  // throttleTime - emits the source Observable values on the output Observable when its internal timer 
  // is disabled, and ignores source values when the timer is enabled. Initially, the timer is disabled. 
  // As soon as the first source value arrives, it is forwarded to the output Observable, and then the timer is enabled
  triggerTT() {
    fromEvent(document, 'click').pipe(throttleTime(2000)).subscribe(x => console.log('clicked'));
  }

  // 5) Error handling
  // catchError
  triggerCatchError() {
    of(1, 2, 3, 4, 5).pipe(
      map(x => {
        if (x === 3) throw 'error';
        return x;
      }),
      catchError(err => of(6, 7))
    ).subscribe(console.log);
    
    of(1, 2, 3, 4, 5).pipe(
      map(x => {
        if (x === 3) throw 'error';
        return x;
      }),
      catchError(err => { throw 'new error' })
    ).subscribe({
      next: x => console.log(x),
      error: e => console.log(e)
    });
  }

  // retry
  triggerRetry() {
    of(1, 2, 3, 4, 5).pipe(
      map(x => {
        if (x === 3) throw 'error';
        return x;
      }),
      retry(2)
    ).subscribe({
      next: x => console.log(x),
      error: e => console.log(e)
    });
  }

  // 6) Mathematical
  // count, max, min
  triggerM() {
    let obs = of(1, 2, 3, 1, 4, 8, 2);

    obs.pipe(count((x) => x === 1)).subscribe(console.log);
    obs.pipe(min()).subscribe(console.log);
    obs.pipe(max()).subscribe(console.log);
  }

  // reduce - Like Array.prototype.reduce(), reduce applies an accumulator function against an 
  // accumulation and each value of the source Observable (from the past) to reduce it to a single value
  triggerReduce() {
    of(1, 2, 3, 1, 4, 8, 2).pipe(
      reduce((acc, v) => acc + v, 10)
    ).subscribe(console.log)
  }

  // 7) Conditional
  
  // find, findIndex
  triggerFind() {
    of(1, 2, 3).pipe(find((x) => x === 2)).subscribe(console.log);
    of(1, 2, 3).pipe(findIndex((x) => x === 2)).subscribe(console.log);
  }

  // every - emits whether or not every item of the source satisfies the condition specified.
  triggerEvery() {
    of(1, 2, 3).pipe(every((x) => x<4)).subscribe(console.log);
    of(1, 2, 3).pipe(every((x) => x<3)).subscribe(console.log);
  }


  // Observable - unicast
  // Subject - special type of Observable that allows values to be multicasted to many Observers
  // Internally to the Subject, subscribe does not invoke a new execution that delivers values. It simply registers the given Observer in a list of Observers
  subject = new Subject<number>();

  ngOnInit() {
    // this.triggerEvery();
    this.subject.subscribe({
      next: x => console.log('obs 1 :: ', x)
    })
    this.subject.next(1);
  }


}
