import EnhancedApi from './enhanced-api';
import LazySubject from './lazy-subject';
import GraphQL from './graphql';
import DataRouter from './datarouter';
import BaseApi from './base-api';

export default class Component {
    constructor(raceid) {
        this.api = new DataRouter(new BaseApi("https://api.me.lifetime.com/"), new GraphQL(""), new LazySubject());
        this.dataSubscription = this.api.getStream(new GraphQL(`
                    event(id: ${raceid}) {
                        results {
                            bib,
                            name,
                            age,
                            sex,
                            time,
                            group
                        }
                    }
        `)).filter(x => x.i > 1 || true)
           .subscribe(this.setState);
    }
    dispose() {
        this.dataSubscription.dispose();
    }
    render() {
        var data = this.getState();
        return `<div>${data.event.id}</div>` + data.event.results.map(x => `<div>${x}</div>`).foldLeft("", (agg, itm) => agg + "\n" + itm);
    }
}