import RealmModel from '../RealmModel';

export default class Thumbnail extends RealmModel {
}

Thumbnail.schema = {
    name: 'Thumbnail',
    properties: {
        thumbnail_medium: { type: 'string', default: '' },
        thumbnail_small: { type: 'string', default: '' }
    }
}