import EnhancedApi from './enhanced-api';

export default class Component {
    constructor() {
        this.api = new EnhancedApi();
        this.foo = this.api.foo();

        this.foo
            .filter(x=>x.i > 1)
            .forEach(x=> {
                this.setState(x);
            });
    }
    dispose() {
        this.foo.dispose();
    }
}