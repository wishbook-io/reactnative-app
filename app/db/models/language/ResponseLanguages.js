import RealmModel from '../RealmModel';

export default class ResponseLanguages extends RealmModel {
}

ResponseLanguages.schema = {
    name: 'ResponseLanguages',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        code: 'string'
    }
}