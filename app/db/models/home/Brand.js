import RealmModel from '../RealmModel';

export default class Brand extends RealmModel {
}

Brand.schema = {
    name: 'Brand',
    primaryKey: 'id',
    properties: {
        id: 'int',
        company: { type: 'string', default: '' },
        name: { type: 'string', default: '' },
        image: 'Image',
        isChecked: { type: 'bool', default: false }
    }
}