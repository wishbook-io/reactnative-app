import RealmModel from '../RealmModel';

export default class Response_State extends RealmModel {
}

Response_State.schema = {
    name: 'Response_State',
    properties: {
        id: 'int',
        state_name: { type: 'string', default: '' },
        state_type: { type: 'string', default: '' },
    }
}