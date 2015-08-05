import {Subject, Observable} from 'rx';
import LazySubject from './lazy-subject';
require('colors');




var subject = new LazySubject();
//subject.forEach(x=> console.log(x));

var node1 = subject.filter(x=>true);
var node2 = subject.filter(x=>true);


var sub1 = node1.subscribe(x=>console.log('node1', x));
var sub2 = node2.forEach(x=>console.log('node2', x));

subject.onNext(1);
subject.onNext(2);
subject.onNext(3);

//console.log("obs ", subject.observers);
sub1.dispose();
//console.log("obs ", subject.observers);

subject.onNext(4);
subject.onNext(5);
subject.onNext(6);

sub2.dispose();
//console.log("obs", subject.observers);

subject.onNext(7);
subject.onNext(8);
subject.onNext(9);

