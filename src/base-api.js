import {Observable, Subject} from 'rx';
export default class BaseApi {
    constructor(baseUri) {
        this.baseUri = baseUri;
        this.responderUri = baseUri + '/responder';
        this.equivocatorUri = baseUri + '/equivocator';
    }
    responder(trackingToken) {
        return Observable.fromPromise(new Promise(resolve => {
            throw 'Not implemented';
        }));
    }
    equivocator(message) {
        return Observable.fromPromise(new Promise(resolve => {
            throw 'Not implemented';
        }));
    }
    subscribe(uri) {
        return Observable.fromPromise(new Promise(resolve => {
            'Call equivocator';
            'Call responder';
            'Resolve promise';
        }));
    }
    helloWorld() {
        return 'Hello World!';
    }

}