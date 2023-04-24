import Resource from '../Resource';

export default class BrandRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
  }
  
  getBrands(params = null) {
    let queryParams = {}
    if (params) {
      //merge 2 json
      for (const key in params) {
        queryParams[key] = params[key];
      }
    }
    return this.resource.list(queryParams, false);
  }
  
  updateBrandsISell(companyId, brandIds, patch) {
    let payload = {brand: brandIds}
    if(patch) {
      return this.resource.patch(JSON.stringify(payload), false);
    }
    
    payload['company'] = companyId
    
    return this.resource.save(JSON.stringify(payload), false)
  }
  
  followBrand(params = null) {
    let queryParams = {}
    if (params) {
      //merge 2 json
      for (const key in params) {
        queryParams[key] = params[key];
      }
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }
  
  unfollowBrand(){
    return this.resource.delete();
  }
  
  addBrand(formData) {
    return this.resource.saveFileUpload(formData);
  }
  // brandPermission(params=null){
  //     return this.resource.update(JSON.stringify(params),false)
  // }

  getBrandsCard = (params = {}) => {
    const queryParams = {
      limit: 10,
      type: 'public',
      ...params
    }
    return this.resource.list(queryParams, false);
  }
}
