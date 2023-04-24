//import realm from './realm';
import _ from 'lodash';

const debugLog = true;

class Db {

    getRealmInstance() {
        // return realm;
        debugLog? console.log("[Db::getRealmInstance]"): null;
        return {};
    }

    getObjects(model) {
        // return realm.objects(model)
        debugLog? console.log("[Db::getObjects]"): null;
        return null;
    }

    isEmptyData(model) {
        // return realm.objects(model).isEmpty()
        // return _.isEmpty(realm.objects(model))
        debugLog? console.log("[Db::isEmptyData]"): null;
        return true;
    }

    create(model, data, update = false) {
        debugLog? console.log("[Db::create]"): null;
        return null;
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
        debugLog? console.log("[Db::deleteAll]"): null;
        return null;
        realm.write(() => {
            realm.delete(model)
        })
    }
}

export default new Db();