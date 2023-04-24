import RealmModel from '../RealmModel';

export default class Supplier_details extends RealmModel {
}

Supplier_details.schema = {
    name: 'Supplier_details',
    properties: {
        city_name: { type: 'string', default: '' },
        state_name: { type: 'string', default: '' },
        near_by_sellers: { type: 'int', default: 0 },
        i_am_selling_this: { type: 'bool', default: false },
        total_suppliers: { type: 'int', default: 0 },
        seller_policy: { type: 'list', objectType: 'ResponseSellerPolicy' },
    }
}