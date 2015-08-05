import {Subject} from 'rx';

export default class ObservableCollection {
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