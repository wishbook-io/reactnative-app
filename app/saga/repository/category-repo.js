import Resource from '../Resource';

export default class CategoryRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
  }
  
  getAllCategory(params) {
    return this.resource.list(params, false);
  }
  
  getEavCategory(filter = '') {
    var queryParams = {
      'category': filter
    };
    return this.resource.list(queryParams, false);
  }

  getCategoryTop = (params = {}) => {
    const queryParams = {
      parent: 1,
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  getCategoryChild = (parent) => {
    const queryParams = {
      parent,
    }
    return this.resource.list(queryParams, false);
  }

  getCategoryEav = (category, attribute_slug) => {
    const queryParams = {
      category,
      attribute_slug,
    }
    return this.resource.list(queryParams, false);
  }
}


