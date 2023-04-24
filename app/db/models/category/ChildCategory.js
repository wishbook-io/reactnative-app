import RealmModel from '../RealmModel';

export default class ChildCategory extends RealmModel {
}

ChildCategory.schema = {
    name: 'ChildCategory',
    primaryKey: 'id',
    properties: {
        id: 'int',
        child_category: { type: 'list', objectType: 'ChildCategory_' },
        image: { type: 'Image' },
        category_name: { type: 'string', default: '' },
        parent_category: { type: 'int', default: 0 },
        is_home_display: { type: 'bool', default: false },
        additionalProperties: 'data?'
    }
}