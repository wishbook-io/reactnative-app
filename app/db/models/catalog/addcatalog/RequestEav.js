import RealmModel from '../../RealmModel';

export default class RequestEav extends RealmModel {
}

RequestEav.schema = {
    name: 'RequestEav',
    properties: {
        size_mix: { type: 'string', default: '' },
        number_pcs_design_per_set: { type: 'int', default: 0 },
        size: 'string?[]',
        fabric: 'string?[]',
        work: 'string?[]',
        other: { type: 'string', default: '' },
    }
}