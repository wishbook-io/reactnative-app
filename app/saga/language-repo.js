import Resource from './Resource';

export default class LanguageRepo{
    constructor(url, model, cache = false) {
        this.resource = new Resource(url, model, cache)
    }

    getSupportedLanguages() {
        return this.resource.list();
    }

    setUserLanguage(action){
        var jsonBody = JSON.stringify({ 
            "userprofile": { "language" : action.id } 
        });
        
        return this.resource.patch(jsonBody);
    }
}