import ObservableCollection from './observable-collection';
import {Subject} from 'rx';

export default class LazySubject extends Subject {
    constructor() {
        super();
        this.observers = new ObservableCollection();
        this.observers.events.filter(([d, l])=>d !== 0).forEach(([d, l])=> {
            if (d === 1 && l === 1) {
                this.onStart();
            } else if (d === -1 && l === 0) {
                this.onEnd();
            }
        });
    }
    onStart() {
    }
    onEnd() {
    }
}
