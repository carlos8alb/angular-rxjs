import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('next: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('complete')
}

const interval$ = new Observable<number>(subscriber => {
    const intervalId = setInterval(() => {
        subscriber.next(Math.random());
    }, 1000);

    return () => {
        clearInterval(intervalId);
        console.log('Intervalo destruido');
    }
});

/* 
Subject behaviour:
1- Multiple cast
2- It is an Observer
3- Next, error and complete
*/

const subject$ = new Subject();
const intervalSubject = interval$.subscribe(subject$);

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    intervalSubject.unsubscribe();
}, 3500);