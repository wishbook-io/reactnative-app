import RealmModel from './RealmModel';

export default class UserInfo extends RealmModel {
}

UserInfo.schema = {
    name: 'UserInfo',
    primaryKey: 'id',
    properties: {
        id: 'int',
        manufacturer: { type: 'bool', default: false },
        wholesaler_distributor: { type: 'bool', default: false },
        retailer: { type: 'bool', default: false },
        online_retailer_reseller: { type: 'bool', default: false },
        broker: { type: 'bool', default: false },
        isGuestUser: { type: 'bool', default: false },
        user_approval_status: { type: 'bool', default: false },
        username: { type: 'string', default: '' },
        first_name: { type: 'string', default: '' },
        last_name: { type: 'string', default: '' },
        email: { type: 'string', default: '' },
        groups: 'int?[]',
        companyuser: { type: 'CompanyUser' },
        userprofile: { type: 'UserProfile' },
        date_joined: { type: 'string', default: '' },
        last_login: { type: 'string', default: '' },
        is_active: { type: 'bool', default: false },
        is_staff: { type: 'bool', default: false }
    }
}