import Resource from '../Resource';

export default class CatalogRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
    //this.resource = new Resource(`/companies/${companyId}/catalogs/`, 'ResponsePromotion' , true);
    //this.resourceDropDown = new Resource(`companies/${consts.COMPANY_ID}/catalog/dropdown`, "CatalogDropDown", true);
  }
  
  getCatalog(id) {
    return this.resource.get(id, true);
  }
  
  getCatalogDropDownList(filters, brandId, categoryId) {
    var queryParams = { "view_type": "public", "brand": brandId, "category": categoryId, "title": filters };
    return this.resource.list(queryParams, false);
  }
  
  validateSetName(text) {
    let queryParams = {
      title: text,
    }
    return this.resource.get(queryParams, false);
  }
  
  getPublicCatalogList(offset = 0, limit = 10, filters = null, listType = null) {
    
    var queryParams = {
      'view_type': 'public',
      'limit': limit,
      'offset': offset,
    };
    
    if (listType) {
      queryParams[`${listType}`] = true
    }
    
    if (filters) {
      //merge 2 json
      for (var key in filters) {
        queryParams[key] = filters[key];
      }
    }
    
    return this.resource.list(queryParams, false);
  }
  
  getCatalogDetails(params={}) {
    const queryParams = {
      expand: true,
      ...params,
    }
    return this.resource.get(queryParams, false);
  }
  
  getMyCatalogList(offset = 0, limit = 10) {
    var queryParams = {
      'view_type': 'my',
      'limit': limit,
      'offset': offset
    };
    return this.resource.list(queryParams, true);
  }
  
  getFilterCatalogList(offset = 0, limit = 10) {
    var queryParams = {
      'view_type': 'my',
      'limit': limit,
      'offset': offset
    };
    return this.resource.list(queryParams, true);
  }
  
  getBrandCatalogList(brandid) {
    var queryParams = { "view_type": "public", "brand": brandid };
    return this.resource.list(queryParams, true);
  }
  
  createCatalog(params) {
    console.log("[createCatalog], params: ", params);
    return this.resource.saveFileUpload(params);
  }
  
  postCatalogOptions(params, catalogId) {
    const queryParams = {
      ...params,
      catalog: catalogId
    }
    return this.resource.save(JSON.stringify(queryParams), false)
  }
  
  postSet(params = {}) {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false)
  }
  
  enableDisableCatalog() {
    
  }
  
  getReadyToShipCatalog() {
    const queryParams = {
      'view_type': 'public',
      'type': 'catalog',
      'ctype': 'public',
      'limit': '10',
      'ready_to_ship': 'true',
      'offset': '0',
    }
    return this.resource.list(queryParams, false);
  }
  
  getFollowedBrandsCatalogList(offset = 0, limit = 10, filters = null, listType = null) {
    
    const queryParams = {
      'limit': limit,
      'offset': offset,
      'follow_brand': 'true',
    };
    
    if (filters) {
      //merge 2 json
      for (var key in filters) {
        queryParams[key] = filters[key];
      }
    }
    
    return this.resource.list(queryParams, false);
  }
  
  getRecentlyViewedCatalog(offset = 0, limit = 10, filters = null) {
    
    const queryParams = {
      'limit': limit,
      'offset': offset,
    }
    
    if (filters) {
      //merge 2 json
      for (var key in filters) {
        queryParams[key] = filters[key];
      }
    }
    
    return this.resource.list(queryParams, false);
  }
  
  getAutoSuggestionList(text) {
    const queryParams = {
      q: text,
    }
    return this.resource.list(queryParams, false);
  }
  
  getCompanyList(name){
    const queryParams = {
      name: name,
    }
    return this.resource.list(queryParams, false);  
  }
  sendEnquiry(params= null){
    let queryParams = {}
    if (params) {
      //merge 2 json
      for (const key in params) {
        queryParams[key] = params[key];
      }
    }
    return this.resource.save(JSON.stringify(queryParams), false);
    
  }
  
  sellCatalog( params = null) {
    
    // var queryParams = {
    //         'params'  :JSON.stringify(params)
    //   };
    return this.resource.save(JSON.stringify(params), false);
  }
  myProductsGetCatalogs(params) {
    //console.log("[myProductsGetCatalogs] params", params)
    const spreadOut = {...params}
    //console.log("[myProductsGetCatalogs] spread out params", spreadOut)
    const queryParams = {
      view_type: 'mycatalogs',
      limit: 10,
      ...params
    }
    //console.log("[myProductsGetCatalogs] listing resource", queryParams)
    return this.resource.list(queryParams, false);
  }
  
  myProductsGetSetMatching(params) {
    //console.log("[myProductsGetSetMatching] params", params)
    const spreadOut = {...params}
    //console.log("[myProductsGetSetMatching] spread out params", spreadOut)
    const queryParams = {
      view_type: 'mycatalogs',
      set_type: 'multi_set',
      catalog_type: 'noncatalog',
      expand: true, // necessary to get products within
      limit: 10,
      ...params
    }
    //console.log("[myProductsGetSetMatching] listing resource", queryParams)
    return this.resource.list(queryParams, false);
  }

  catalogViewed = (params = {}) => {
    const queryParams = {
      catalog_type: 'public',
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  getSharedProducts = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  shareProducts = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  bulkUpdateStartStop = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  getMyProductDetails = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  startSharing = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  getGuestProductDetails = () => {
    const queryParams = {
      expand: true  
    }
    return this.resource.list(queryParams, false);
  }
}
