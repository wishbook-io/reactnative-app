import RealmModel from '../RealmModel';

export default class Response_User extends RealmModel {
}

Response_User.schema = {
    name: 'Response_User',
    primaryKey: 'id',
    properties: {
        id: { type:'int', default: '0' },
        username: { type:'string', default:''},
        first_name: { type:'string', default:''},
        last_name: { type:'string', default:''},
        email: { type:'string', default:''},
        groups: 'string?[]',
        companyuser: 'companyuser',
        userprofile: 'userprofile'
    }
}