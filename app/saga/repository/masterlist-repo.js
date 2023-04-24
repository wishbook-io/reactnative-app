import Resource from '../Resource';

export default class MasterListRepo {

    constructor(url, model, cache = false) {
        this.resource = new Resource(url, model, cache)
    }

    getGroupTypes() {
        return this.resource.get();
    }

    getCategory(limit = 10) {
        /*
        TODO: give a parameter, instead of directly setting is_home_display to 1
        because the same method is used in categories screen where is_home_display
        is not set
        */
        var queryParams = {
            'parent': limit,
            'is_home_display': 1,
        };
        return this.resource.list(queryParams, false);
    }

    getCategoryEavAttribute(categoryId) {
        var queryParams = {
            'category': categoryId
        };
        return this.resource.list(queryParams, false);
    }
}