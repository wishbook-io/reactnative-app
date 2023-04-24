import Resource from '../Resource';

export default class MyFilterRepo {

    constructor(url, model, cache = false) {
        this.resource = new Resource(url, model, cache)
    }

    getMyFilterlist() {
        let queryParams = {
        }
        return this.resource.list(queryParams, false);
    }

    saveToMyFilterlist(title =null, sub_text = null, params = null) {
        
        var queryParams = {
            'title': title,
            'sub_text': sub_text,
            'params'  :params
          };
        //   if (filters) {
        //     //merge 2 json
        //     for (var key in filters) {
        //       queryParams[key] = filters[key];
        //     }
        //   }
      
        return this.resource.save(JSON.stringify(queryParams), false);
    }
   removeFromMyFilterlist(){
    return this.resource.delete();
   }
}