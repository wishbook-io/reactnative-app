import RealmModel from '../../RealmModel';

export default class Add_Catalog_Response extends RealmModel {
}

Add_Catalog_Response.schema = {
    name: 'Add_Catalog_Response',
    primaryKey: 'id',
    properties: {
        id: 'int',
        category: { type: 'string', default: '' },
        title: { type: 'string', default: '' },
        thumbnail: { type: 'ThumbnailObj' },
        view_permission: { type: 'string', default: '' },
        picasa_url: { type: 'string', default: '' },
        company: { type: 'string', default: '' },
        brand: { type: 'string', default: '' },
        sell_full_catalog: { type: 'string', default: '' },
        picasa_id: { type: 'string', default: '' },
        total_products: { type: 'string', default: '' },
    }
}