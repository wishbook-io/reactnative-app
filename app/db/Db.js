import realm from './realm';
import _ from 'lodash';

class Db {

    getRealmInstance() {
        return realm;
    }

    getObjects(model) {
        return realm.objects(model)
    }

    isEmptyData(model) {
        // return realm.objects(model).isEmpty()
        return _.isEmpty(realm.objects(model))
    }

    create(model, data, update = false) {
        if (data instanceof Array) {
            realm.write(() => {
                _.forEach(data, (item) => {
                    realm.create(model, item, update)
                })
            })
        } else {
            realm.write(() => {
                return realm.create(model, data, update)
            })
        }
    }

    deleteAll(model) {
        realm.write(() => {
            realm.delete(model)
        })
    }
}

export default new Db();