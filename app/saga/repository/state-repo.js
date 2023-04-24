import Resource from '../Resource';

export default class StateRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
  }
  
  getData() {
    return this.resource.list('', false);
  }

  getOrderedStates = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }
}
