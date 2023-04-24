import Resource from '../Resource';

export default class ErrorHandlerRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
  }

  testError = (params) => {
    const queryParams = {
      sleep: 1000,
      ...params,
    }
    return this.resource.list(queryParams, false);
  }

  testErrorCode = (params) => {
    const queryParams = {
      sleep: 1000,
      ...params,
    }
    return this.resource.list(queryParams, false);
  }

  testPostError = (params) => {
    const queryParams = {
      ...params,
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }
}
