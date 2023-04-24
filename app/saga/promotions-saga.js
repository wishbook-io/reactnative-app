import { all, takeEvery, call, put } from 'redux-saga/effects';

//Task
//1. get list of stories

import {  
  GET_STORIES_ACTION,                   setAllStoriesListSuccess,
  GET_COMPANYRATING_ACTION,             setCompanyRatingSuccess,
  GET_BANNERS_ACTION,                   setBannersSuccess,
  GET_HOME_PROMOTIONAL_TAGS_ACTION,     setHomePromotionalTagsSuccess,
  GET_USER_REVIEW_BANNERS_ACTION,       setUserReviewBannersSuccess,
  GET_PRODUCT_PROMOTIONAL_TAGS_ACTION,  getProductPromotionalTagsSuccess,
  GET_USER_VIDEO_REVIEWS_ACTION,        getUserVideoReviewsSuccess,
} from '../actions/promotions-actions';
import { errorActionSet } from '../actions/error-actions';
import PromotionsRepo from './repository/promotions-repo';
import { CONSTANT_URL, URLConstants } from "../utils/URLConstants";


function* getAllStoriesList() {
  try {
    var promotionsRepo = new PromotionsRepo(CONSTANT_URL.STORIES, model = 'StoriesModel', true);
    
    const { response, error } = yield call(promotionsRepo.getAllStoriesList.bind(promotionsRepo));
    
    // console.log("getAllStoriesList call response: " + response, error);
    
    if (response) {
      yield put(setAllStoriesListSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* getCompanyRating() {
  try {
    let urlObj = new URLConstants();
    let url = urlObj.companyUrl('solo-propreitorship-kyc', '');
    
    console.log("url obj", url);
    
    var promotionsRepo = new PromotionsRepo(url, model = '', false);
    
    const { response, error } = yield call(promotionsRepo.getCompanyRating.bind(promotionsRepo));
    
    // console.log("getCompanyRating call response: " + response, error);
    
    if (response) {
      yield put(setCompanyRatingSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getBannersList() {
  try {
    var promotionsRepo = new PromotionsRepo(CONSTANT_URL.BANNER_URL, model = 'ResponsePromotion', false);
    
    const { response, error } = yield call(promotionsRepo.getBannersList.bind(promotionsRepo));
    
    // console.log("getBannersList call response: ", response, error);
    
    if (response) {
      yield put(setBannersSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }  
}

export function* getHomePromotionalTags(action) {
  try {
    //console.log("getHomePromotionalTags called ", response, error);
    var promotionsRepo = new PromotionsRepo(CONSTANT_URL.PROMOTIONAL_TAG, model = '', false);
    
    const { response, error } = yield call(promotionsRepo.getHomePromotionalTags.bind(promotionsRepo), action.params);
    
    //console.log("getHomePromotionalTags call response: ", response, error);
    
    if (response) {
      yield put(setHomePromotionalTagsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

export function* getUserReviewBanners() {
  try {
    var promotionsRepo = new PromotionsRepo(CONSTANT_URL.FEEDBACK_URL, model = '', false);
    
    const { response, error } = yield call(promotionsRepo.getUserReviewBanners.bind(promotionsRepo));
    
    // console.log("getUserReviewBanners call response: ", response, error);
    
    if (response) {
      yield put(setUserReviewBannersSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  } 
}

export function* getProductPromotionalTags(action) {
  try {
    //console.log("getHomePromotionalTags called ", response, error);
    const promotionsRepo = new PromotionsRepo(CONSTANT_URL.PRODUCT_TAB_PROMOTION, model = '', false);
    
    const { response, error } = yield call(promotionsRepo.getProductPromotionalTags, action.params);
    
    //console.log("getHomePromotionalTags call response: ", response, error);
    if (response) {
      yield put(getProductPromotionalTagsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}
export function* getUserVideoReviews(action) {
  try{
    var promotionsRepo = new PromotionsRepo(CONSTANT_URL.FEEDBACK_URL, model = '', false);
    
    const { response, error} = yield call(promotionsRepo.getUserVideoReviews)
    if(response){
      //console.log("get the users video review list ", response)
      yield put(getUserVideoReviewsSuccess(response))
    } else{
      yield put(errorActionSet(error));      
    }
  }catch{
    yield put(errorActionSet(error));    
  }
}

export default promotionsRootSaga = [
  takeEvery(GET_STORIES_ACTION,                   getAllStoriesList),
  takeEvery(GET_COMPANYRATING_ACTION,             getCompanyRating),
  takeEvery(GET_BANNERS_ACTION,                   getBannersList),
  takeEvery(GET_HOME_PROMOTIONAL_TAGS_ACTION,     getHomePromotionalTags),
  takeEvery(GET_USER_REVIEW_BANNERS_ACTION,       getUserReviewBanners),
  takeEvery(GET_PRODUCT_PROMOTIONAL_TAGS_ACTION,  getProductPromotionalTags),
  takeEvery(GET_USER_VIDEO_REVIEWS_ACTION,        getUserVideoReviews),
]
