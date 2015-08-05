import graphql from 'graphqlite';
import QueryLanguage from './query-language';

export default class GraphQL extends QueryLanguage {
    constructor(text) {
        super();
        this.text = text;
        try {
            this.structure = graphql.parse(this.text);
            this.valid = true;
        } catch (e) { this.valid = false; }
    }
    internalContainsProps(msg, gql){
        return true;
    }
    internalUnionStructure(otherQuery){
        return new GraphQL(this.text + "\n" + otherQuery.text);
    }
    asFilter() {
        return function(msg){
            this.internalContainsProps(msg, this.structure);
        };
    }
    asMessage() { return this.text; }
    union(query) { return this.internalUnionStructure(query); }
    isValid() { return this.valid; }
    language() { return 'graphql'; }
}