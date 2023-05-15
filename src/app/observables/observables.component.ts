import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.subscribeTest();
    // this.executionTest()
    this.dispose();
  }

  // Producer Consumer communication
  // 2 protocols - Pull & Push
  // Push - Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.
  // An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers)
  // synchronously or asynchronously return zero to (potentially) infinite values

  // Anatomy of an observable
  // create, subscribe, execute, dispose

  // 1) Create
  // Using Observable constructor which takes a function as argument.
  usingConstructor = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    // setTimeout(() => {
      //   subscriber.next(4);  // asynchronous
      // }, 1000);
    subscriber.complete();
    subscriber.next(4); // does not execute
  });

  // Using creation functions.
  usingFunc = of(1, 2, 3);


  // 2) Subscribe
  // Subscribing to an Observable is like calling a function, providing callbacks (observer) where the data will be delivered to.
  // start an "Observable execution" and deliver values or events to an Observer of that execution.
  subscribeTest() {
    console.log('calling obs 1');
    this.usingConstructor.subscribe((x) => console.log(x));
    console.log('calling obs 2');
    this.usingFunc.subscribe((x) => console.log(x));
    console.log('done');
  }


  // 3) Execute
  // code inside new Observable(()=>{}) is observable execution
  // can return 3 types of values/notifications
        // 1) next - sends a value
        // 2) error - sends js error/exception
        // 3) complete - does not send any value
  // error & complete may happen only once and either one of them triggers

  executionTest() {
    this.usingConstructor.subscribe({
      next: (x) => console.log('value :: ', x),
      error: (err) => console.log(err),
      complete: () => console.log('complete')
    })
  }

  // 4) Dispose
  // Because Observable Executions may be infinite, and it's common for an Observer to want to abort execution in finite time
  dispose() {
    const subscription = this.usingFunc.subscribe(
      (x) => console.log(x)
    );

    subscription.unsubscribe(); // disposes the resource held by the subscription
  }

}
