import DbHelper from './DbHelper';
import _ from 'lodash';

class Queries {

    create(model, data) {
        DbHelper.getInstance().create(model, data)
    }

    /* a typical query */
    getDataFromModel(model, list = false) {
        const results = DbHelper.getInstance().getObjects(model);
        if(list) {
            let resultList = []
            _.forEach(results, (value, index) => {
                resultList[index] = value;
            })
            return resultList;
        }
        return results;
    }

    getCountries(model) {
        var obj = DbHelper.getInstance().getObjects(model);
        console.log('new countries', obj);

        let countries = obj.map(function (item) {
            return item;
        });

        console.log('new array', countries);
        return countries;
    }

    isEmpty(model) {
        return results = DbHelper.getInstance().isEmptyData(model);
    }

    query(model, filter) {
        let results = DbHelper.getInstance().getObjects(model);
        if (filter) {
            return results.filtered(filter);
        }
        return results;
    }

}
export default new Queries();