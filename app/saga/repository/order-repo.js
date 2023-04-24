import Resource from '../Resource';

export default class OrderRepo {
  
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache)
  }
  
  getOrders(params) {
    let queryParams = {
      ...params,
    }
    return this.resource.list(queryParams, false);
  }
  
  getOrderDetail(){
    return this.resource.get();
  }
  
  cancelOrder(id,processing_status,supplier_cancel){
    let jsonBody = JSON.stringify({
      id:id,
      processing_status:processing_status,
      supplier_cancel:supplier_cancel,
    })
    return this.resource.patch(jsonBody);
  }

  getLeadquiry = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  getGroupedLeads = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }
  
  getCodReconfirmableOrder = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  patchPurchaseOrder = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }
}