import _ from 'lodash';


class DeepLink{

    constructor(){
        this.dispatch = {};    
    }

    setDispatch(dispatch){
        this.dispatch=dispatch;
        // console.log('dispact',this.dispatch)
    }
    getDispatch(){
        return this.dispatch;
    }
    fireDispatch(params){
        this.dispatch(params)
    }
        
}
 
const deepLink = new DeepLink();
export default deepLink;
    
    