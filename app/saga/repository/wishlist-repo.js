import Resource from '../Resource';

export default class WishlistRepo {
  
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache)
  }
  
  getWishlist() {
    let queryParams = {
    }
    return this.resource.list(queryParams, false);
  }
  
  addToWishList(params = null) {
    let queryParams = {}
    if (params) {
      //merge 2 json
      for (const key in params) {
        queryParams[key] = params[key];
      }
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }
  
  deleteFromWishlist = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }
}