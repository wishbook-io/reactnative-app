export const isInWishlist = (id, wishlist) => {
  if(!wishlist || wishlist.length === 0) {
    return false;
  }

  const found = wishlist.findIndex((item) => item.id === id && !item.removedFromWishlist)

  return found >= 0
}