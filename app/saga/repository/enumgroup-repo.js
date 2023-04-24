import Resource from '../Resource';

export default class EnumGroupRepo {
    constructor(url, model, cache = false) {
        this.resource = new Resource(url, model, cache);
    }

    getEnumGroup(filter = '') {
        var queryParams = {
            'type': filter
        };
        return this.resource.list(queryParams, false);
    }
}
