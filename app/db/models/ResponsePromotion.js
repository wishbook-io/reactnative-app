import RealmModel from './RealmModel';

export default class ResponsePromotion extends RealmModel {
}

ResponsePromotion.schema = {
    name: 'ResponsePromotion',
    primaryKey: 'id',
    properties: {
        id: 'int',
        image: { type: 'ImageBanner' },
        image_ppoi: { type: 'string', default: '' },
        landing_page_type: { type: 'string', default: '' },
        landing_page: { type: 'string', default: '' },
        start_date: { type: 'string', default: '' },
        end_date: { type: 'string', default: '' },
        status: { type: 'string', default: '' },
        active: { type: 'string', default: '' },
        url: { type: 'string', default: '' },
        campaign_name: { type: 'string', default: '' }
    }
}