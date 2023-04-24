import RealmModel from './RealmModel';

export default class Countries extends RealmModel {
}

Countries.schema = {
    name: 'Countries',
    properties: {
        id: 'int',
        name: { type: 'string', default: '' },
        phone_code: { type: 'string', default: '' }
    }
}