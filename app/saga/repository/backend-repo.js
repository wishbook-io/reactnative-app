import { Platform } from 'react-native'
import Resource from '../Resource';

export default class BackendRepo {
  
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache)
  }
  
  postContacts(contactsArray) {
    let jsonBody = JSON.stringify({
      contacts: contactsArray,
    })
    return this.resource.save(jsonBody, false);
  }
  
  postLocation(location) {
    let jsonBody = JSON.stringify({
      ...location
    })
    return this.resource.patch(jsonBody);
  }

  getAppVersion = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  postUserPlatform = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }
}