import RealmModel from '../RealmModel';

export default class ResponseSellerPolicy extends RealmModel {
}

ResponseSellerPolicy.schema = {
    name: 'ResponseSellerPolicy',
    primaryKey: 'id',
    properties: {
        id: 'int',
        company: { type: 'string', default: '' },
        policy_type: { type: 'int', default: 0 },
        policy: { type: 'string', default: '' },
    }
}