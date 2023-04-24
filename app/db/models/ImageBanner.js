import RealmModel from './RealmModel';

export default class ImageBanner extends RealmModel {
}

ImageBanner.schema = {
    name: 'ImageBanner',
    properties: {
        full_size: { type: 'string', default: '' },
        banner: { type: 'string', default: '' }
    }
}