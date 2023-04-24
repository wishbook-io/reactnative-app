import RealmModel from './RealmModel';

export default class AuthenticationModel extends RealmModel {
}

AuthenticationModel.schema = {
    name: 'AuthenticationModel',
    properties: {
        otp: { type: 'string', default: '' },
        is_password_set: { type: 'bool', default: false }
    }
}