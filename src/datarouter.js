import {Observable, Subject} from 'rx';

export default class DataRouter {
    constructor(baseApi, query, streamSubject) {
        this.coreStream = streamSubject;
        this.giantCompositeQuery = query;
        this.baseApi = baseApi;
    }
    getStream(query) {
        this.giantCompositeQuery = this.giantCompositeQuery.union(query);
        var msg = this.baseApi.makeQueryMessage(this.giantCompositeQuery.asMessage(), this.giantCompositeQuery.language());
        this.baseApi.sendMessage(msg).subscribe(this.coreStream);
        return this.coreStream.filter(query.asFilter());
    }
}