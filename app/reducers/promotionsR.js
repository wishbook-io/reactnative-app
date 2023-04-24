import {
  GET_STORIES_ACTION,                   GET_STORIES_SUCCESS,
  GET_COMPANYRATING_ACTION,             GET_COMPANYRATING_SUCCESS,
  GET_BANNERS_ACTION,                   GET_BANNERS_SUCCESS,
  GET_HOME_PROMOTIONAL_TAGS_ACTION,     GET_HOME_PROMOTIONAL_TAGS_SUCCESS,
  GET_USER_REVIEW_BANNERS_ACTION,       GET_USER_REVIEW_BANNERS_SUCCESS,
  GET_PRODUCT_PROMOTIONAL_TAGS_ACTION,  GET_PRODUCT_PROMOTIONAL_TAGS_SUCCESS,
  GET_USER_VIDEO_REVIEWS_ACTION,        GET_USER_VIDEO_REVIEWS_SUCCESS,
} from "../actions/promotions-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
  stories: {},
  responseCompanyCredit: {},
  responseBanners: [],
  responseHomePromotionalTags: [],
  responseUserReviewBanners: [],
  responseGetProductPromotionalTags: [],
  responseGetUserVideoReviews: [],
};

const promotionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STORIES_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_STORIES_SUCCESS:
    return {
      ...state,
      stories: action.stories,
      isLoading: false
    };
    case GET_COMPANYRATING_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_COMPANYRATING_SUCCESS:
    return {
      ...state,
      responseCompanyCredit: action.responseCompanyCredit,
      isLoading: false
    };
    case GET_BANNERS_ACTION:
    return {
      ...state,
    };
    case GET_BANNERS_SUCCESS:
    return {
      ...state,
      responseBanners: action.responseBanners,
    };
    case GET_HOME_PROMOTIONAL_TAGS_ACTION:
    return {
      ...state,
    }
    case GET_HOME_PROMOTIONAL_TAGS_SUCCESS:
    return {
      ...state,
      responseHomePromotionalTags: action.responseHomePromotionalTags,
    }
    case GET_USER_REVIEW_BANNERS_ACTION:
    return {
      ...state,
    }
    case GET_USER_REVIEW_BANNERS_SUCCESS:
    return {
      ...state,
      responseUserReviewBanners: action.responseUserReviewBanners,
    }

    case GET_PRODUCT_PROMOTIONAL_TAGS_ACTION:
    return {
      ...state,
    }
    case GET_PRODUCT_PROMOTIONAL_TAGS_SUCCESS:
    return {
      ...state,
      responseGetProductPromotionalTags: action.responseGetProductPromotionalTags.filter(t => t.image && t.image.thumbnail_small)
    }
    case GET_USER_VIDEO_REVIEWS_ACTION:
    return {
      ...state,
    }
    case GET_USER_VIDEO_REVIEWS_SUCCESS:
    return {
      ...state,
      responseGetUserVideoReviews: action.responseGetUserVideoReviews,
    }

    default:
    return commonErrorReducer(state, action);
  }
};

export default promotionsReducer;
