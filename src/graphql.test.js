import queryLanguageTest from './query-language.test';
import GraphQL from './graphql';

describe('GraphQL', () => {
    queryLanguageTest(GraphQL);
    it('can parse a valid query', () => {
        var testQuery = `
  node(id: 123) {
    id,
    name,
    birthdate {
      month,
      day,
    },
    friends(first: 1) {
      cursor,
      edges {
        node {
          name
        }
      }
    }
  }

  filter(name: "test string parameter") {

  }
`;

        var gql = new GraphQL(testQuery);
        expect(gql.isValid()).toBe(true);
    });
    it('can not parse an invalid query', () => {
        var testQuery = `
  node(id: 123) {
    id,
    name,
    birthdate {
      month,
      day,
    },
`;

        var gql = new GraphQL(testQuery);
        expect(gql.isValid()).toBe(false);
    });
    it('can union two queries into a query with two queries', () => {
        var testQuery1 = `
fooooo(id: 123) {
    id,
    name,
    birthdate {
      month,
      day,
    }
}`;
        var testQuery2 = `
barrrr(id: 123) {
    id,
    name,
    races(take: 10) {
      id,
      name,
      date,
    }
}`;
        var gql1 = new GraphQL(testQuery1);
        var gql2 = new GraphQL(testQuery2);
        var unionQuery = gql1.union(gql2);
        expect(unionQuery.isValid()).toBe(true);
        expect(unionQuery.asMessage()).toContain(testQuery1);
        expect(unionQuery.asMessage()).toContain(testQuery2);
    });
});