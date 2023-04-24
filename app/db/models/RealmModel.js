import Realm from 'realm';

export default class RealmModel extends Realm.Object {
    static types = {
        bool: true,
        string: true,
        int: true,
        boolean: true,
        float: true,
        double: true,
        date: true
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    toJSON() {
        let schema = this.constructor.schema.properties;
        let json = {};
        for (var varId in schema) {
            // console.log("var varId", varId);
            if (schema.hasOwnProperty(varId)) {
                // console.log("var varId 1", varId);
                let type = null;
                if (schema[varId] instanceof Object) {
                    // console.log("var varId 2", varId);
                    type = schema[varId]['type'];
                    // console.log("var varId 3", type);
                } else {
                    // console.log("var varId 4", type);
                    type = schema[varId];
                    // console.log("var varId 41", type);
                }

                if (RealmModel.types[type]) {
                    json[varId] = this[varId];
                    // console.log("var varId 5", json[varId]);
                } else if (type === 'list') {
                    let obj = this[varId];
                    // console.log("var varId 6", obj);
                    json[varId] = [];
                    for (let i = 0; i < obj.length; i++) {
                        json[varId].push(obj[i].toJSON());
                    }
                    // console.log("var varId 7", json[varId]);
                } else if (type === 'int?[]' || type === 'string?[]') {
                    let obj = this[varId];
                    // console.log("var varId 6 1", obj);
                    json[varId] = [];
                    for (let i = 0; i < obj.length; i++) {
                        json[varId].push(obj[i]);
                    }
                    // console.log("var varId 7 1", json[varId]);
                } else {
                    // console.log("var varId 8", this[varId].toJSON());
                    json[varId] = this[varId].toJSON();
                    // console.log("var varId 9", json[varId]);
                }
            }
        }
        return json;
    }
}