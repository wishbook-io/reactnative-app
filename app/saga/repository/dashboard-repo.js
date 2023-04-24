import Resource from '../Resource';

export default class DashboardRepo {
  
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache)
  }
  
  getBuyerDashboard() {
    let queryParams = {
      
    }
    return this.resource.list(queryParams, false);
  }
  
  getSellerDashboard() {
    let queryParams = {
      
    }
    return this.resource.list(queryParams, false);
  }
  
  getStatistics() {
    let queryParams = {
      
    }
    return this.resource.list(queryParams, false);
  }
  
  getConfig = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }
}