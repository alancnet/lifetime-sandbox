import {Observable, Subject} from 'rx';
export default class BaseApi {
    constructor(baseUri) {
        this.baseUri = baseUri;
        this.responderUri = baseUri + '/responder';
        this.equivocatorUri = baseUri + '/equivocator';
    }
    responder(trackingToken) {
        if(trackingToken === 'STREAM'){
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': trackingToken,
                    'status': 'complete',
                    'error': null,
                    'result': {
                        'type': 'stream',
                        'stream': 'ws://api.me.lifetime.com/stream/309B8969DB81'
                    }
                });
            }));
        } else if (trackingToken === 'FINAL') {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': trackingToken,
                    'status': 'complete',
                    'error': null,
                    'result': {
                        'type': 'foo',
                        'foo': 'ahhh'
                    }
                });
            }));
        } else if (trackingToken === 'STEP5') {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': 'FINAL',
                    'status': 'inprogress - 4'
                });
            }));
        } else if (trackingToken === 'STEP4') {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': 'STEP5',
                    'status': 'inprogress - 3'
                });
            }));
        } else if (trackingToken === 'STEP3') {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': 'STEP4',
                    'status': 'inprogress - 2'
                });
            }));
        } else if (trackingToken === 'STEP2') {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': 'STEP3',
                    'status': 'inprogress - 1'
                });
            }));
        } else if (trackingToken === 'STEP1') {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': 'STEP2',
                    'status': 'accepted'
                });
            }));
        } else {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'token': 'STEP1',
                    'status': 'pending'
                });
            }));
        }
    }
    equivocator(message) {
        if (message === 'STREAM') {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'status': 'pending',
                    'token': 'STREAM'
                });
            }));
        } else {
            return Observable.fromPromise(new Promise(resolve => {
                resolve({
                    'status': 'pending',
                    'token': 'SIMPLE'
                });
            }));
        }
    }
    websocketAsStream(wsUrl) {
        // do we only open a single WS to syracuse here and always
        // return it like a singleton?
        // or do we do many, and this needs to be caught in the closure?
        //var ws = new WebSocket('wss://echo.websocket.org');
        //ws.onmessage = function (event) {
        //    console.log(event.data);
        //}
        //var sub = Observable.fromEvent(ws, 'message').map(event=>event.data);
        //setTimeout(() => {
        //    ws.send('{'type':'foo', 'foo':'ahhh'}');
        //}, 10);
        //https://www.websocket.org/echo.html
        //return sub;
        var results = Observable.generate(0, x => x <= 10, x => x + 1, x => {
            return {
                        'type': 'test',
                        'test': 'foo'
                    };
        });
        return results;
    }
    streamifier(streamWithTokens) {
        return streamWithTokens.filter(x=>x.status !== 'complete')
            .flatMap(x=>this.responder(x.token))
            .flatMap(x=>{
                if (x.status !== 'complete') {
                    return this.streamifier(Observable.fromPromise(new Promise(resolve => resolve(x))));
                }
                else if (x.result.type === 'stream') {
                    return this.websocketAsStream(x.result.stream);
                }
                else {
                    return Observable.fromPromise(new Promise(resolve => resolve(x.result)));
                }
            });
    }
    sendMessage(msg) {
        return this.streamifier(this.equivocator(msg));
    }
    makeQueryMessage(queryMessage, queryLang) {
        return {'type': 'query', 'query': queryMessage};
    }
}