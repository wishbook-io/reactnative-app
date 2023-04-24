import RealmModel from '../RealmModel';

export default class ThumbnailObj extends RealmModel {
}

ThumbnailObj.schema = {
    name: 'ThumbnailObj',
    properties: {
        full_size: { type: 'string', default: '' },
        thumbnail_medium: { type: 'string', default: '' },
        thumbnail_small: { type: 'string', default: '' }
    }
}