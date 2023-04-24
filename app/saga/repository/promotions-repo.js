import Resource from '../Resource';

export default class PromotionsRepo {
  
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache)
  }
  
  getAllStoriesList() {
    return this.resource.list();
  }
  
  getCompanyRating() {
    return this.resource.get();
  }
  
  getBannersList(params = {}) {
    const queryParams = {
      ...params,
      // format: 'json',
    }
    return this.resource.list(queryParams, false);
  }
  
  getHomePromotionalTags(params = {}) {
    const queryParams = {
      ...params,
      // format: 'json',
    }
    return this.resource.list(queryParams, false);
  }
  
  getUserReviewBanners() {
    const queryParams = {
      review_type: 'ImageReview'
    }
    return this.resource.list(queryParams, false);
  }

  getProductPromotionalTags = (params = {}) => {
    const queryParams = {
      ...params,
      visible_on: "ProductTab",
    }
    return this.resource.list(queryParams, false);
  }
  
  getUserVideoReviews = () => {
    const queryParams = {
      language_code: 'en',
      review_type: 'VideoReview'     
    }
    return this.resource.list(queryParams, false)
  }
}
