import BaseApi from './base-api';

describe('BaseApi', () => {
    var baseApi;
    beforeEach(()=>{
        baseApi = new BaseApi();
    });
    it('should let me send a message and give me a message', done => {
        setTimeout(function() {}, 0);
        baseApi.sendMessage('SIMPLE').forEach(msg=>{
            expect(msg).toEqual({
                        "type": "foo",
                        "foo": "ahhh"
                    });
            done();
        });
    });
    it('should let me send a message and give me a stream with multiple messages', done => {
        setTimeout(function() {}, 0);
        baseApi.sendMessage('STREAM').take(3).subscribe(msg=>{
            expect(msg).toEqual({
                        'type': 'test',
                        'test': 'foo'
                    });
        },
        console.error, ()=>{ done(); });
    });
});

describe('DataRouter', () => {
    it('should have a way for GetStream to add its query');
    it('should have a way for GetStream to remove its query');
    it('should merge all queries to a single definition');
    it('should send updates to the definition to the server');
});

describe('GetStream', () => {
    it('should accept a query');
    it('should return a stream');
    it('should verify the data it receives fulfills its query');
    it('should update DataRouter with its query');
});

describe('Query Language', () => {
    it('must be union-able');
    it('must be translatable to a query expression for filter against an object');
});
