import RealmModel from '../RealmModel';

export default class CatalogObj extends RealmModel {
}

CatalogObj.schema = {
    name: 'CatalogObj',
    primaryKey: 'id',
    properties: {
        id: 'int',
        brand: { type: 'Response_Brands' },
        thumbnail: { type: 'ThumbnailObj' },
        title: { type: 'string', default: '' },
        thumbnail_ppoi: { type: 'string', default: '' },
        view_permission: { type: 'string', default: '' },
        picasa_id: { type: 'string', default: '' },
        picasa_url: { type: 'string', default: '' },
        deleted: { type: 'string', default: '' },
        company: { type: 'string', default: '' },
        category: { type: 'string', default: '' },
    }
}