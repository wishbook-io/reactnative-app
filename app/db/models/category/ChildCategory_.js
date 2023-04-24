import RealmModel from '../RealmModel';

export default class ChildCategory_ extends RealmModel {
}

ChildCategory_.schema = {
    name: 'ChildCategory_',
    primaryKey: 'id',
    properties: {
        id: 'int',
        child_category: 'data?',
        image: { type: 'Image' },
        category_name: { type: 'string', default: '' },
        parent_category: { type: 'int', default: 0 },
        is_home_display: { type: 'bool', default: false },
        additionalProperties: 'data?'
    }
}