import RealmModel from '../RealmModel';

export default class Supplier_company_rating extends RealmModel {
}

Supplier_company_rating.schema = {
    name: 'Supplier_company_rating',
    properties: {
        id: { type: 'int', default: 0 },
        total_seller_rating: { type: 'int', default: 0 },
        company: { type: 'int', default: 0 },
        buyer_score: { type: 'float', default: 0.0 },
        total_buyer_rating: { type: 'int', default: 0 },
        seller_score: { type: 'float', default: 0.0 }
    }
}