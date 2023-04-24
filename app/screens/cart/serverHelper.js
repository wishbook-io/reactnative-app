import { execute } from 'app/config/saga'
import consts from 'app/utils/const';
import _ from 'lodash';

import { getCatalogDetailsAction } from 'app/actions/catalog-actions';
import { getCatalogDetails } from 'app/saga/catalog-saga';

import { addToCartAction } from 'app/actions/cart-actions';
import { addToCart } from 'app/saga/cart-saga';

export const getProductDetails = async (params) => {
  const response = await execute(getCatalogDetails, getCatalogDetailsAction(params, true));
  return response;
}

export const updateCart = async (params) => {
  const response = await execute(addToCart, addToCartAction(params));
  return response;
}

export const isInCart = (id, cartDetails) => {
  //console.log("[isInCart] id", id)
  if(!cartDetails || cartDetails.length === 0 || Object.keys(cartDetails).length === 0) {
    //console.log("[isInCart] invalid cart")
    return false;
  }
  const found = cartDetails.catalogs.findIndex((catalogItem) => {
    const matched = 
                    (catalogItem.is_full_catalog && (catalogItem.product_id === id || catalogItem.catalog_id === id))
                    // do we have a full catalog
                    ||
                    (!catalogItem.is_full_catalog && catalogItem.products[0].product_id === id)
                    // do we have a single piece  
                    // ||
                    // (catalogItem.products && catalogItem.products.findIndex((prod) => prod.product === id) !== -1)
    return matched
  })
  
  return found >= 0;
}

export const getCartCount = (cartDetails) => {
  if(!_.get(cartDetails, 'catalogs[0]')) {
    return 0;
  }

  const catalogReducer = (count, catalog) => {
    const updatedCount = count + catalog.products[0].quantity
    return updatedCount
  }

  const cartCount = cartDetails.catalogs.reduce(catalogReducer, 0);
  return cartCount;
}