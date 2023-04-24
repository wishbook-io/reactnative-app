import RealmModel from '../RealmModel';

export default class Products extends RealmModel {
}

Products.schema = {
    name: 'Products',
    primaryKey: 'id',
    properties: {
        id: 'int',
        image: 'Image',
    }
}