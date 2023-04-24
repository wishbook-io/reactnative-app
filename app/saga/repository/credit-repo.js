import Resource from '../Resource';

export default class CreditRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
  }

  getCreditLine = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  getCreditRating = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }
  
}
