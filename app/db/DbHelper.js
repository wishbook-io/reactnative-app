import Db from './Db';

export default class DbHelper {

    static getInstance() {
        var instance = Db;
        if (!instance) {
            throw new Error('DbHelper.js :: Active Instance Not Set!');
        }
        return instance;
    }

    /* note: this is where you would also setInstance and define a constant, or other method for the instance path */
}