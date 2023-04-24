import RealmModel from '../RealmModel';

export default class Response_BuyerGroupType extends RealmModel {
}

Response_BuyerGroupType.schema = {
    name: 'Response_BuyerGroupType',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', default: '' },
    }
}