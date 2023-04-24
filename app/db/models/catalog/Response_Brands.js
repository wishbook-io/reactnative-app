import RealmModel from '../RealmModel';

export default class Response_Brands extends RealmModel {
}

Response_Brands.schema = {
    name: 'Response_Brands',
    primaryKey: 'id',
    properties: {
        id: 'int',
        company: { type: 'string', default: '' },
        name: { type: 'string', default: '' },
        image: { type: 'Image' },
        total_catalogs: { type: 'int', default: 0 },
        response_catalogs: { type: 'list', objectType: 'Response_Catalog' },
        isExpanded: { type: 'bool', default: false },
        isSelected: { type: 'bool', default: false },
        is_followed: { type: 'bool', default: false },
        isChecked: { type: 'bool', default: false }
    }
}