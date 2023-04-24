import RealmModel from '../RealmModel';

export default class Image extends RealmModel {
}

Image.schema = {
    name: 'Image',
    properties: {
        thumbnail_small: { type: 'string', default: '' },
        full_size: { type: 'string', default: '' },
        thumbnail_medium: { type: 'string', default: '' },
    }
}