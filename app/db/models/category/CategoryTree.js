import RealmModel from '../RealmModel';

export default class CategoryTree extends RealmModel {
}

CategoryTree.schema = {
    name: 'CategoryTree',
    primaryKey: 'id',
    properties: {
        id: 'int',
        child_category: { type: 'list', objectType: 'ChildCategory' },
        image: { type: 'Image' },
        category_name: { type: 'string', default: '' },
        parent_category: { type: 'int', default: 0 },
        is_home_display: { type: 'bool', default: false },
        additionalProperties: 'data?'
    }
}