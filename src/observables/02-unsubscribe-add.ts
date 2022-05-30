import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('next: ', value),
    error: error => console.warn('error: ', error),
    complete: () => console.info('complete')
}

const intervalo$ = new Observable<number>( subscriber => {
    let contador = 0;
    
    const interval = setInterval( () => {
        contador++;
        subscriber.next(contador);
    }, 1000);

    setTimeout( () => {
        subscriber.complete();
    }, 2500);

    return () => {
        clearInterval(interval);
        console.log('Intervalo destruido');
    }

});

const subs1 = intervalo$.subscribe( observer );
const subs2 = intervalo$.subscribe( observer );

subs1.add( subs2 );

setTimeout( () => {
    subs1.unsubscribe();
    console.log('Se ha cancelado la subscripcion');
}, 3000);