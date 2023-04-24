import Resource from '../Resource';

export default class CartRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
  }

  getCartBanner = (params = {}) => {
    const queryParams = {
      only_show_on: 'cart',
      language_code: 'en',
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  getCatalogWiseCartDetails = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  deleteCartItem = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  patchCartQuantity = (params = {}) => {
    const queryParams = {
      finalize: false,
      add_quantity: false,
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  patchCartWbMoney = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  addToCartPost = (params = {}) => {
    const queryParams = {
      finalize: false,
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  addToCartPatch = (params = {}) => {
    const queryParams = {
      finalize: false,
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }
}
