import Resource from '../Resource';

export default class ShipayRepo {
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache);
  }

  getAddress = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  addAddress = (params = {}) => {
    const queryParams = {
      country: 1,
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  patchAddress = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  deleteAddress = () => {
    return this.resource.delete();
  }

  getShippingCharges = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  selectShippingAddress = (params) => {
    const queryParams = {
      ...params,
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  patchShippingCharges = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  getPaymentModes = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  offlinePayment = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  patchDisplayAmount = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  patchResellerTotalAmount = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  getPincodes = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  getDeliveryInfo = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }
}
