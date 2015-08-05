import QueryLanguage from './query-language';
import {Observable} from 'rx';

export default class ObjectQueryLanguage extends QueryLanguage {
    constructor(string) {
        super();
        this.source = string;
    }
    asFilter() {
        return record => {
        };
    }
    asMessage() {
        return {
            oql: this.source
        };
    }
    union(oql) {
        if (!oql || !oql.hasOwnProperty('source')) {
            throw new Error('Invalid input.');
        }
    }
    isValid() {
        return true;
    }
    language() {
        return 'OQL';
    }
}