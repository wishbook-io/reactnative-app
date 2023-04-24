import RealmModel from '../RealmModel';

export default class Response_Catalog extends RealmModel {
}

Response_Catalog.schema = {
    name: 'Response_Catalog',
    primaryKey: 'id',
    properties: {
        id: 'int',
        brand: { type: 'Response_Brands' },
        title: { type: 'string', default: '' },
        thumbnail: { type: 'ThumbnailObj' },
        view_permission: { type: 'string', default: '' },
        category: { type: 'string', default: '' },
        products: { type: 'list', objectType: 'ProductObj' },
        company: { type: 'string', default: '' },
        total_products: { type: 'string', default: '' },
        push_user_id: { type: 'string', default: '' },
        full_catalog_orders_only: { type: 'string', default: '' },
        sell_full_catalog: { type: 'string', default: '' },
        is_disable: { type: 'bool', default: false },
        objs: { type: 'list', objectType: 'ProductObj' },
        isExpanded: { type: 'bool', default: false },
        price_range: { type: 'string', default: '' },
        supplier: { type: 'string', default: '' },
        supplier_chat_user: { type: 'string', default: '' },
        supplier_name: { type: 'string', default: '' },
        is_product_price_null: { type: 'bool', default: false },
        is_trusted_seller: { type: 'bool', default: false },
        supplier_id: { type: 'int', default: 0 },
        buyer_disabled: { type: 'bool', default: false },
        eavdata: { type: 'Eavdata' },
        supplier_details:{type: 'Supplier_details'},
        supplier_company_rating:{type: 'Supplier_company_rating'},
        is_owner: { type: 'bool', default: false },
        is_seller: { type: 'bool', default: false },
        is_currently_selling: { type: 'bool', default: false },
        is_public: { type: 'bool', default: false },
        is_supplier_approved: { type: 'bool', default: false },
        is_addedto_wishlist: { type: 'string', default: '' },
        created_at: { type: 'string', default: '' },
        enquiry_id: { type: 'string', default: '' },
        category_name: { type: 'string', default: '' },
        suppliers: { type: 'list', objectType: 'MultipleSuppliers' }
    }
}