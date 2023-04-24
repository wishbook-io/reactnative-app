import Resource from '../Resource';

export default class DiscountRepo {
  
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache)
  }
  
  listDiscount = (params = {}) => {
    const queryParams = {
      expand: true,
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  getDiscount = (params = {}) => {
    const queryParams = {
      expand: true,
      ...params
    }
    return this.resource.list(queryParams, false);
  }
  
  checkDiscount = (brandId) => {
    const queryParams = {
      is_allow_to_upload_catalog_for_brand: brandId,
      expand: true
    }
    return this.resource.list(queryParams, false);
  }

  postDiscount = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  patchDiscount = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  listUsedDiscount = (params = {}) => {
    const queryParams = {
      type: 'brandwisediscount',
      ...params
    }
    return this.resource.list(queryParams, false);
  }
}
