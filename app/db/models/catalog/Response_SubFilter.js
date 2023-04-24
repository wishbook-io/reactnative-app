import RealmModel from '../RealmModel';

export default class SubFilterObj extends RealmModel {
}

SubFilterObj.schema = {
    name: 'SubFilterObj',
    primaryKey: 'id',
    properties: {
        id: 'int',
        category: { type: 'string', default: '' },
        name: { type: 'string', default: '' },
        status: { type: 'string', default: '' },
        url: { type: 'string', default: '' },
        created: { type: 'string', default: '' },
        sort_order:  { type: 'int', default: 0 },
    }
}