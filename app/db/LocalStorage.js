import { AsyncStorage } from 'react-native';

import { debugLog } from '../utils/debugVars';

/**
 * Deals with the local storage of Notes into AsyncStorage
 *
 * @class LocalStorage
 */
class LocalStorage {
    /**
     * Get a single item
     *
     * @param {string} key
     * @memberof LocalStorage
     */
    async getItem(key) {
        var value = await AsyncStorage.getItem(key);
        debugLog? console.log('------------------------------value', value) : null;
        try {
            const parsedValue = JSON.parse(value)
            return parsedValue;
        } catch(error) {
            console.log("Error while parsing. key, value:", {key, value})
            return value;
        }
    }

    /**
     * Save a single item
     *
     * @param key
     * @param value
     * @memberof LocalStorage
     */
    async setItem(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Deletes a single item
     *
     * @memberof LocalStorage
     */
    async deleteItem(key) {
        return AsyncStorage.removeItem(key);
    }

    /**
     * Get all the items
     *
     * @memberof LocalStorage
     */
    async getAllItems() {
        return AsyncStorage.getAllKeys()
            .then((keys) => {
                const fetchKeys = keys.filter((k) => { return k });
                return AsyncStorage.multiGet(fetchKeys);
            })
            .then((result) => {
                return result.map((r) => { return JSON.parse(r[1]) });
            });
    }
};

const localStorage = new LocalStorage();
export default localStorage;