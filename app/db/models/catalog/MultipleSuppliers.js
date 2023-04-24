import RealmModel from '../RealmModel';

export default class MultipleSuppliers extends RealmModel {
}

MultipleSuppliers.schema = {
    name: 'MultipleSuppliers',
    properties: {
        relation_id: { type: 'string', default: '' },
        company_id: { type: 'string', default: '' },
        city_name: { type: 'string', default: '' },
        trusted_seller: { type: 'bool', default: false },
        chat_user: { type: 'string', default: '' },
        name: { type: 'string', default: '' },
        state_name: { type: 'string', default: '' },
        seller_score: { type: 'string', default: '' },
        is_supplier_approved: { type: 'bool', default: false },
        enquiry_id: { type: 'string', default: '' },
        seller_policy: { type: 'list', objectType: 'ResponseSellerPolicy' }
    }
}