import {Subject, Observable} from 'rx';
require('colors');

class ObservableCollection {
    constructor() {
        var self = this;
        var lastLength = 0;
        this.array = [];
        this.events = new Subject();
        function verifyLength() {
            var doDef = function(x) {
                Object.defineProperty(self, x.toString(), {
                    get: () => self.array[x],
                    set: value => self.array[x] = value,
                    configurable: true
                });
            };
            var i;
            for (i = lastLength; i < self.length; i++) {
                doDef(i);
            }
            for (i = self.length; i < lastLength; i++) {
                delete self[i.toString()];
            }
            lastLength = self.length;
        }

        ['push', 'pop', 'splice', 'slice', 'indexOf'].forEach(name => {
            var f = this.array[name];
            if (typeof f === 'function') {
                this[name] = function() {
                    var l = self.array.length;
                    f.apply(self.array, arguments);
                    var d = self.array.length - l;
                    verifyLength();
                    self.events.onNext([d, self.array.length]);
                };
            }
        });
        Object.defineProperty(this, 'length', {
            get: () => this.array.length,
            set: length => {
                var l = this.array.length;
                var d = length - l;
                this.array.length = length;
                verifyLength();
                this.events.onNext([d, length]);
            }
        });
    }
}

class LazySubject extends Subject {
    constructor() {
        super();
        this.observers = new ObservableCollection();
        this.observers.events.filter(([d, l])=>d !== 0).forEach(([d, l])=> {
            console.log('Event'.cyan, d, l);
            if (d === 1 && l === 1) {
                this.onStart();
            } else if (d === -1 && l === 0) {
                this.onEnd();
            }
        });
    }
    onStart() {
        console.log('Start stream!'.green);
    }
    onEnd() {
        console.log('End stream!'.red);
    }
}

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

