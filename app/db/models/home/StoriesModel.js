import RealmModel from '../RealmModel';

export default class StoriesModel extends RealmModel {
}

StoriesModel.schema = {
    name: 'StoriesModel',
    primaryKey: 'id',
    properties: {
        id: 'int',
        image_ppoi: { type: 'string', default: '' },
        deep_link: { type: 'string', default: '' },
        catalogs_details: { type: 'list', objectType: 'Catalogs_details' },
        completion_count: { type: 'int', default: 0 },
        catalogs: 'int?[]',
        name: { type: 'string', default: '' },
        image: { type: 'string', default: '' },
        is_disable: { type: 'bool', default: false },
        sort_order: { type: 'int', default: 0 },
    }
}