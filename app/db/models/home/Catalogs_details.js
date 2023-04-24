import RealmModel from '../RealmModel';

export default class Catalogs_details extends RealmModel {
}

Catalogs_details.schema = {
    name: 'Catalogs_details',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: { type: 'string', default: '' },
        brand: 'Brand',
        products: { type: 'list', objectType: 'Products' },
        thumbnail: 'Thumbnail'
    }
}