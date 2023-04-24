import RealmModel from './RealmModel';

export default class CompanyGroupFlag extends RealmModel {
}

CompanyGroupFlag.schema = {
    name: 'CompanyGroupFlag',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', default: '' },
        city: { type: 'string', default: '' },
        phone_number: { type: 'string', default: '' },
        manufacturer: { type: 'bool', default: false },
        wholesaler_distributor: { type: 'bool', default: false },
        retailer: { type: 'bool', default: false },
        online_retailer_reseller: { type: 'bool', default: false },
        broker: { type: 'bool', default: false },
        company: { type: 'int', default: 0 }
    }
}