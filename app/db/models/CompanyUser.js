import RealmModel from './RealmModel';

export default class CompanyUser extends RealmModel {
}

CompanyUser.schema = {
    name: 'CompanyUser',
    primaryKey: 'id',
    properties: {
        id: 'int',
        username: { type: 'string', default: '' },
        companyname: { type: 'string', default: '' },
        company_type: { type: 'string', default: '' },
        brand_added_flag: { type: 'string', default: '' },
        deputed_to_name: { type: 'string', default: '' },
        total_my_catalogs: { type: 'int', default: 0 },
        total_brand_followers: { type: 'int', default: 0 },
        company_group_flag: { type: 'CompanyGroupFlag' },
        address: { type: 'int', default: 0 },
        company: { type: 'int', default: 0 },
        deputed_from: { type: 'string', default: '' },
        user: { type: 'int', default: 0 },
        deputed_to: { type: 'string', default: '' }
    }
}