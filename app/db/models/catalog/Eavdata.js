import RealmModel from '../RealmModel';

export default class Eavdata extends RealmModel {
}

Eavdata.schema = {
    name: 'Eavdata',
    properties: {
        work: 'string?[]',
        fabric: 'string?[]',
        size: 'string?[]',
        other: { type: 'string', default: '' },
        number_pcs_design_per_set: { type: 'string', default: '' },
        stitching_type: { type: 'string', default: '' },
    }
}