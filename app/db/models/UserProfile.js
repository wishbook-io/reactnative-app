import RealmModel from './RealmModel';

export default class UserProfile extends RealmModel {
}

UserProfile.schema = {
    name: 'UserProfile',
    properties: {
        alternate_email: { type: 'string', default: '' },
        country: { type: 'int', default: 0 },
        phone_number: { type: 'string', default: '' },
        phone_number_verified: { type: 'string', default: '' },
        user_image: { type: 'string', default: '' },
        tnc_agreed: { type: 'bool', default: false },
        warehouse: { type: 'int', default: 0 },
        browser_notification_disable: { type: 'bool', default: false },
        user_approval_status: { type: 'string', default: '' },
        is_profile_set: { type: 'bool', default: false },
        language: { type: 'int', default: 0 }
    }
}