import RealmModel from '../RealmModel';

export default class ProductObj extends RealmModel {
}

ProductObj.schema = {
    name: 'ProductObj',
    primaryKey: 'id',
    properties: {
        id: 'int',
        sku: { type: 'Response_Brands' },
        title: { type: 'string', default: '' },
        fabric: { type: 'string', default: '' },
        work: { type: 'string', default: '' },
        catalog: { type: 'CatalogObj' },
        image: { type: 'ThumbnailObj' },
        final_price: { type: 'string', default: '' },
        selling_price: { type: 'string', default: '' },
        price: { type: 'string', default: '' },
        public_price: { type: 'string', default: '' },
        push_user_product_id: { type: 'string', default: '' },
        product_likes: { type: 'string', default: '' },
        product_like_id: { type: 'string', default: '' },
        barcode: { type: 'string', default: '' },
    }
}