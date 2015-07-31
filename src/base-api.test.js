import BaseApi from './base-api';

describe('BaseApi', () => {
    var baseApi;
    beforeEach(()=>{
        baseApi = new BaseApi();
    });
    it('should greet me', () => {
        expect(baseApi.helloWorld()).toEqual('Hello World!');
    });
});

describe('DataRouter', () => {
    it('should derive from LazySubject');
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
