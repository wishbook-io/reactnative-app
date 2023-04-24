import Resource from '../Resource';

export default class WbMoneyRepo {

    constructor(url, model, cache = false) {
        this.resource = new Resource(url, model, cache)
    }

    getWbMoneyData = () => {
      return this.resource.list(undefined, false);
    }
}