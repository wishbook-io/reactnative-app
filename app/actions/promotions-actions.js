export const GET_STORIES_ACTION = "GET_STORIES_ACTION";
export const GET_STORIES_SUCCESS = "GET_STORIES_SUCCESS";

export const GET_COMPANYRATING_ACTION = "GET_COMPANYRATING_ACTION";
export const GET_COMPANYRATING_SUCCESS = "GET_COMPANYRATING_SUCCESS";

export const GET_BANNERS_ACTION = "GET_BANNERS_ACTION";
export const GET_BANNERS_SUCCESS = "GET_BANNERS_SUCCESS";

export const GET_HOME_PROMOTIONAL_TAGS_ACTION = "GET_HOME_PROMOTIONAL_TAGS_ACTION";
export const GET_HOME_PROMOTIONAL_TAGS_SUCCESS = "GET_HOME_PROMOTIONAL_TAGS_SUCCESS";

export const GET_USER_REVIEW_BANNERS_ACTION = "GET_USER_REVIEW_BANNERS_ACTION";
export const GET_USER_REVIEW_BANNERS_SUCCESS = "GET_USER_REVIEW_BANNERS_SUCCESS";

export const GET_PRODUCT_PROMOTIONAL_TAGS_ACTION = 'GET_PRODUCT_PROMOTIONAL_TAGS_ACTION';
export const GET_PRODUCT_PROMOTIONAL_TAGS_SUCCESS = 'GET_PRODUCT_PROMOTIONAL_TAGS_SUCCESS';

export const GET_USER_VIDEO_REVIEWS_ACTION = 'GET_USER_VIDEO_REVIEWS_ACTION'
export const GET_USER_VIDEO_REVIEWS_SUCCESS = 'GET_USER_VIDEO_REVIEWS_SUCCESS'

export const getAllStoriesListAction = () => ({
  type: GET_STORIES_ACTION,
});

export const setAllStoriesListSuccess = (stories) => ({
  type: GET_STORIES_SUCCESS,
  stories
});

export const getCompanyRatingAction = () => ({
  type: GET_COMPANYRATING_ACTION,
});

export const setCompanyRatingSuccess = (responseCompanyCredit) => ({
  type: GET_COMPANYRATING_SUCCESS,
  responseCompanyCredit
});

export const getBannersAction = () => ({
  type: GET_BANNERS_ACTION,
});

export const setBannersSuccess = (responseBanners) => ({
  type: GET_BANNERS_SUCCESS,
  responseBanners
});

export const getHomePromotionalTagsAction = () => ({
  type: GET_HOME_PROMOTIONAL_TAGS_ACTION,
  params: {
    status: 'Enable',
  }
});

export const setHomePromotionalTagsSuccess = (responseHomePromotionalTags) => ({
  type: GET_HOME_PROMOTIONAL_TAGS_SUCCESS,
  responseHomePromotionalTags,
});

export const getUserReviewBannersAction = () => ({
  type: GET_USER_REVIEW_BANNERS_ACTION,
});

export const setUserReviewBannersSuccess = (responseUserReviewBanners) => ({
  type: GET_USER_REVIEW_BANNERS_SUCCESS,
  responseUserReviewBanners,
});

export const getProductPromotionalTagsAction = (params) => ({
  type: GET_PRODUCT_PROMOTIONAL_TAGS_ACTION,
  params,
});

export const getProductPromotionalTagsSuccess = (responseGetProductPromotionalTags) => ({
  type: GET_PRODUCT_PROMOTIONAL_TAGS_SUCCESS,
  responseGetProductPromotionalTags,
});

export const getUserVideoReviewsAction = () => ({
  type: GET_USER_VIDEO_REVIEWS_ACTION,
})

export const getUserVideoReviewsSuccess = (responseGetUserVideoReviews) => ({
  type: GET_USER_VIDEO_REVIEWS_SUCCESS,
  responseGetUserVideoReviews,
})
