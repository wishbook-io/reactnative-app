import RealmModel from '../RealmModel';

export default class Response_CatalogMini extends RealmModel {
}

Response_CatalogMini.schema = {
    name: 'Response_CatalogMini',
    primaryKey: 'id',
    properties: {
        id: 'int',
        brand: { type: 'int', default: 0 },
        title: { type: 'string', default: '' },
        thumbnail: { type: 'ThumbnailObj' },
        view_permission: { type: 'string', default: '' },
        category: { type: 'int', default: 0 },
        category_name: { type: 'string', default: '' },
        company: { type: 'string', default: '' },
        total_products: { type: 'int', default: 0 },
        push_user_id: { type: 'string', default: '' },
        full_catalog_orders_only: { type: 'bool', default: false },
        sell_full_catalog: { type: 'bool', default: false },
        is_disable: { type: 'bool', default: false },
        brand_name: { type: 'string', default: '' },
        brand_image: { type: 'string', default: '' },
        Expanded: { type: 'bool', default: false },
        supplier: { type: 'int', default: 0 },
        supplier_name: { type: 'string', default: '' },
        max_sort_order: { type: 'int', default: 0 },
        is_product_price_null: { type: 'bool', default: false },
        is_supplier_approved: { type: 'bool', default: false },
        price_range: { type: 'string', default: '' },
        supplier_chat_user: { type: 'string', default: '' },
        is_brand_followed: { type: 'bool', default: false },
        is_trusted_seller: { type: 'bool', default: false },
        buyer_disabled: { type: 'bool', default: false },
        supplier_disabled: { type: 'bool', default: false },
        supplier_id: { type: 'string', default: '' },
        public_count: { type: 'int', default: 0 },
        is_owner: { type: 'bool', default: false },
        is_addedto_wishlist: { type: 'bool', default: false },
        //customViewModel: { type: 'string', default: '' },
        supplier_company_rating: { type: 'Supplier_company_rating' },
        supplier_details: { type: 'Supplier_details' }
    }
}