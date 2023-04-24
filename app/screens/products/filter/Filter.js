import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList,Dimensions,TextInput,TouchableHighlight } from 'react-native';
import { 
  Header,
  Footer, 
  Title, 
  Content, 
  Spinner,
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  CheckBox as NBCheckBox,
  Text,
  Item,
  Input,
  Container 
} from 'native-base';
import { TouchableRipple } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import {NavigationActions,NavigationEvents} from 'react-navigation'
import {connect} from 'react-redux';
import _ from 'lodash';

import Radio from 'app/components/Radio/Radio';
import CheckBox from 'app/components/CheckBox/CheckBox';
import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed';
import Modal from 'app/components/Modal/Modal';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';

import {getAllBrandsAction} from  'app/actions/brand-actions.js';
import {
  getEnumGroupFabricAction,
  getEnumGroupWorksAction,
  getEnumGroupStyleAction
} from 'app/actions/enumgroup-actions.js';
import {getOrderedStatesAction} from 'app/actions/state-actions.js';
import {goToProductsTab} from 'app/actions/navigation-actions'
import {getCategoriesAction,getEavCategoriesAction}from 'app/actions/category-actions.js';
import {saveFilterServerAction} from 'app/actions/productTab-filter-actions';
import { getEavCategories } from 'app/saga/category-saga'
import { execute } from 'app/config/saga'

import { TestIdGenerator } from 'app/utils/TestingHelper';
const buttonIdGenerator = TestIdGenerator("FilterScreen", '', "Button")
const{height,width}=Dimensions.get('window');

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper'

const staticFilters = ['Brand', 'Fabric', 'Work', 'Style', 'Price', 'State', 'Catalog']
const dynamicFiltersList = ['Size','Stitch']
const emptyFilter = [];

///toDos- correct text below my filter and update UI 

const initialLocalFilterStateDEBUG = new Map([['ready_to_ship', true], ['product_type', 'catalog']])

//helper to decide whether to show checkboes or radio buttons 
const multipleOptionsEnabled ={
 "Category":false,
  "Brand" :true,
  "Fabric":true,
  "Work"  :true,
  "Style" :false,
  'Price' :true,
  "State" :true,
  "Catalog":false,
  "Size"  :true,
  "Stitch":false  
}

const textToShow = {
  "Brand" : i => i['name'],
  "Fabric": i => i['value'],
  "Work"  : i => i['value'],
  "Style" : i => i['value'],
  'Price' : i => i['value'].replace(/([\d]+)/g, '₹$1'),
  "State" : i => i['state_name'],
  "Size"  : i => i['value'],
  "Stitch": i => i['value'] 
}
const searchEnabled ={
  "Category":false,
  "Brand" :true,
  "Fabric":true,
  "Work"  :true,
  "Style" :false,
  'Price' :false,
  "State" :true,
  "Catalog":false,
  "Size"  :false,
  "Stitch":false 
}

const serverToUiFilterType = {
  'brand': "Brand",
  'work': 'Work',
  'fabric': 'Fabric',
  'style': 'Style',
  'state': 'State',
  'size': 'Size',
  'stitching_type': 'Stitch',
}

const serverToUiMinPrice = [
  250, 500, 750, 1000, 1500, 2000, 2500, 5000
]

const savedFilterParamOrder = [
  ['category', i => i.category_name],
  ['product_type'],
  ['sell_full_catalog'],
  ['ready_to_ship'],
  ['stitching_type', i => i.value],
  ['size', i => i.value],
  ['brand', i => i.name],
  ['fabric', i => i.value],
  ['work', i => i.value],
  ['style', i => i.value],
  ['min_price'],
  ['max_price'],
  ['state', i => i.state_name],
]

const FilterOption = ({onPress, text, radio, selected, testIds={}}) => {
  return (
    <View style={styles.FilterOption}>
      <TouchableRipple {...testIds}  onPress={onPress} style={{}}>
        <View style={styles.FilterOptionButton}>
          <Text style={styles.FilterOptionListText}>{text}</Text>
          {
            radio
            ? <Radio selected={selected} {...testIds} onPress={onPress}/>
            : <CheckBox selected={selected} {...testIds} onPress={onPress} checkBoxStyle={{marginRight: 10,}}/>
          }
          </View>
      </TouchableRipple>
    </View>
  );
}

class FilterOptionList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      arrayholder:this.props.response_data,
      searchText:''
    }
  } 
 
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.response_data!==this.props.response_data){
      // console.log('prop updated')
    this.setState({
        arrayholder:this.props.response_data,
        searchText:''
      })
    }
  }
  
  searchFilterFunction = text => {    
    // console.log('text changed',text)
    if (!text || text === '') {
      this.setState({arrayholder:this.props.response_data})
    }  
    else{  
      const newData = this.props.response_data.filter(item => {      
        const itemData = textToShow[this.props.currentFilter](item).toUpperCase()
        const textData = text.toUpperCase();  
        return itemData.indexOf(textData) > -1; 
      });    
      this.setState({ arrayholder: newData,searchText:text });  
    }
  };  
    
renderFilterOption = ({ item, index }) => {
  return (
    <FilterOption 
    onPress={() => this.props.onPress(item.id, multipleOptionsEnabled[this.props.currentFilter])}
    radio={!multipleOptionsEnabled[this.props.currentFilter]}
    text={textToShow[this.props.currentFilter](item)}
    selected={this.props.filterState && this.props.filterState.includes(item.id)}
    testIds={buttonIdGenerator(this.props.currentFilter+"Option"+item.id)}
    />
  )
}

render() {
    // console.log('data in FilterOptionList',this.props.response_data, multipleOptionsEnabled[this.props.currentFilter],this.props.currentFilter,this.props.filterState)
return (
  <View style={{flex:1}}>
    {
        searchEnabled[this.props.currentFilter]?
            <Item style={{marginLeft:15,marginRight:15}}>
                <Icon active name='search' />
                <Input 
                  placeholder='Search'
                  {...buttonIdGenerator(this.props.currentFilter+"OptionSearch")}
                  value={this.state.searchText}
                  onChangeText={(text)=>{this.searchFilterFunction(text)}}
                  />
            </Item>
            : null 
    }
    {
        this.props.response_data==undefined||this.props.response_data.length==0?
            <Spinner color={colorresource.liteblue} /> 
           :
            <FlatList
              // data={this.props.response_data}
              data={this.state.arrayholder}
              extraData={this.props.filterState}
              renderItem={this.renderFilterOption}
              keyExtractor={item => item.id.toString()}
              // keyExtractor={(item,index) => index.toString()}
              />
    }
  </View>
    );
  }
}

CatalogOption = ({ description, radio, selected, onPress, index }) => {
    return (
      <View style={styles.FilterOption}>
        <TouchableOpacity {...buttonIdGenerator("CatlogOption"+description)} onPress={onPress} style={styles.FilterOptionButton}>
          <Text>{description}</Text>
          {
            radio?
            <Radio selected={selected} onPress={onPress}/>
            :
            <CheckBox selected={selected} onPress={onPress} checkBoxStyle={{marginRight: 10,}}/>
          }
        </TouchableOpacity>
      </View>
    );
}




class CatalogOptionUI extends Component {

constructor(props) {
    super(props);
    this.state = {
      catalog_Selected:null,
      catalog_predefined_filter_Selected:null
    };
}

selectedStatus =(index,value)=>{
  console.log(index,value)
  if(index===value)
    return true;
}

componentWillMount(){
  if(this.props.catalog_Selected==true){
    this.setState({catalog_Selected:0})
  }
  if(this.props.catalog_Selected==false){
    this.setState({catalog_Selected:1})
  }
  if(this.props.catalog_predefined_filter_Selected==true){
    this.setState({catalog_predefined_filter_Selected:1})
  }
  if(this.props.catalog_predefined_filter_Selected==false){
    this.setState({catalog_predefined_filter_Selected:0})
  }
}
  render() {
  return (
    <View>       
        <View style={{backgroundColor: 'grey', height: 1}}/>
        <FlatList
           data={['Full Catalog for sale', 'Single Piece available', 'Both available']}
           renderItem={({ item, index }) => <CatalogOption {...buttonIdGenerator("CatlogOption"+item)} description={item} radio={true} selected={this.selectedStatus(index,this.state.catalog_Selected)} onPress={() => {
             console.log('catalog option',index)
            if(index===0){
                this.setState({catalog_Selected:index})
                this.props.onPress('sell_full_catalog',true)
            }
            if(index===1){
                this.props.onPress('sell_full_catalog',false)
                this.setState({catalog_Selected:index})
            }
            else{
                this.props.onPress('delete','sell_full_catalog')
                this.setState({catalog_Selected:index})
            }
            }}/>}
            keyExtractor={(item,index) => index.toString()}
        />
        <View style={{backgroundColor: 'grey', height: 1}}/>
        <Text style={{marginTop: 10, marginLeft: 10, fontSize: 13, color: 'grey'}}>Catalog Availability</Text>
        <FlatList
            data={['Pre-Order', 'Ready to ship', 'Both available']}
            renderItem={({ item, index }) => <CatalogOption description={item} radio={true} selected={this.selectedStatus(index,this.state.catalog_predefined_filter_Selected)} onPress={() => {
            if(index===0){
                this.setState({catalog_predefined_filter_Selected:index})
                this.props.onPress('ready_to_ship',false)
            }
            if(index===1){
                this.props.onPress('ready_to_ship',true)
                this.setState({catalog_predefined_filter_Selected:index})
            }
            else{
                this.props.onPress('delete','ready_to_ship')
                this.setState({catalog_predefined_filter_Selected:index})
            }
            }}/>}
            keyExtractor={(item,index) => index.toString()}
        />
    </View>
    );
  }
}

class Filter extends Component {

 constructor(props) {
    super(props);
    let filterType = this.constructFilterType(emptyFilter, true);
    this.state = {
      filterType: filterType,
      Category: null,
      CategoryOptionSelected:null,
      saveFilterText:null,
      saveFilterSubText:null,
      ready_to_ship:true,
      showSaveFilterModal:false,
      product_type:this.props.product_type,
      response_price: [
        {
            "id": 0,
            "value": "101 to 250"
        },
        {
            "id": 1,
            "value": '251 to 500'
        },
        {
            "id": 2,
            "value": "501 to 750"
        },
        {
            "id": 3,
            "value": "751 to 1000"
        },
        {
            "id": 4,
            "value": "1001 to 1500"
        },
        {
            "id": 5,
            "value": "1501 to 2000"
        },
        {
            "id": 6,
            "value": "2001 to 2500"
        },
        {
            "id": 7,
            "value": "2501 to 5000"
        },
        {
            "id": 8,
            "value": "Above 5000"
        }
      ]
    
  }
    this.initialState =this.state;
}


caculateMaxPrice = (id)=>{
      if(id===0)
        return "250";
      if(id===1)
        return "500";
      if(id===2)
        return "750";
      if(id===3)
        return "1000";
      if(id===4)
        return "1500";
      if(id===5)
        return "2000";
      if(id===6)
        return "2500";
      if(id===7)
        return "5000";
      if(id===8)
        return "5000";
}

calculateMinPrice = (id)=>{
   if(id===0)
        return "101";
      if(id===1)
        return "251";
      if(id===2)
        return "501";
      if(id===3)
        return "751";
      if(id===4)
        return "1001";
      if(id===5)
        return "1501";
      if(id===6)
        return "2001";
      if(id===7)
        return "2501";
      if(id===8)
        return "5000";
}

reset = () => {
  for (var key in this.state) {
      if (this.state.hasOwnProperty(key)&&this.initialState.hasOwnProperty(key)) {
      }
      else{
        delete this.state[key] 
      }
  }
  this.setState(this.initialState,()=>{
      console.log('reset',this.state,this.initialState)
      // this.props.navigation.goBack()
      goToProductsTab()
  });
}
 



//a utility function to fetch available options for a filter on changing a filter on the left hand side 
//params - updatedFilterType ( type of the filter selected on left hand side)
changeFilterActions = (updatedFilterType)=>{
   switch(updatedFilterType) {
    case "Category":
        if(this.props.filterDataCategory.length===0)
        this.props.dispatch(getCategoriesAction());
        break;
    case "Brand":
        if(this.props.filterDataBrand.length===0)
        {
        let params={};
        params["type"]="public"
        this.props.dispatch(getAllBrandsAction(params));
        }
        break;
    case "Fabric":
        if(this.props.filterDataFabric.length==0)
        this.props.dispatch(getEnumGroupFabricAction('fabric'));
        break;
    case "Work":
        if(this.props.filterDataWorks.length==0)
        this.props.dispatch(getEnumGroupWorksAction('work'));
        break;
    case "Style":
        if(this.props.filterDataStyle.length==0)    
        this.props.dispatch(getEnumGroupStyleAction('style'));
        break;
    case "State":
        if(this.props.filterDataState.length==0)  
        this.props.dispatch(getOrderedStatesAction({ordering: 'catalogwise'}));
        break;            
    default:
    console.log('default',updatedFilterType) 
 }
}


//a utility function which return data to be passed to the right side of filter screen (available options for a filter) on changing a filter type on left hand side
//params - updatedFilterType ( type of the filter selected on left hand side)
response_data = (updatedFilterType)=>{
  switch(updatedFilterType) {
    case "Category":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataCategory)
        return this.props.filterDataCategory;
        break;
    case "Brand":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataBrand)  
        return this.props.filterDataBrand;
        break;
    case "Fabric":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataFabric)  
        return this.props.filterDataFabric;
        break;
    case "Work":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataWorks)  
        return this.props.filterDataWorks;
        break;
    case "Style":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataStyle)          
        return this.props.filterDataStyle;
        break;
    case "State":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataState)          
        return this.props.filterDataState;
        break;
    case "Price":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataState)          
        return this.state.response_price;
        break;   
    case "Size":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataState)          
        return this.props.filterDataEavCategory[0].attribute_values;
        break;   
    case "Stitch":
        // console.log('response_data to be sent to filteroptionslist',this.props.filterDataState)          
        return this.props.filterDataEavCategory[0].attribute_values;
        break;              
    default:
    console.log('default',updatedFilterType) 
 }
}




onFilterTypeButtonPress = (index) => {
  let updatedFilterType = [...this.state.filterType];
    // console.log('onFilterTypeButtonPress')
      if(updatedFilterType[index].selected) return;
  
  updatedFilterType = updatedFilterType.map((item, index) => ({...item, selected:false}));
      updatedFilterType[index].selected = true;
         this.setState({filterType: updatedFilterType},()=>{
              this.changeFilterActions(updatedFilterType[index].filter);
    });
}
  

renderFilterType = ({ item, index }) => {
  let view = null;
    const selected = item.selected;
      const count = item.count;
        const buttonStyles = [styles.FilterTypeButton, selected? styles.FilterTypeButtonSelected : styles.FilterTypeButtonIdle];
          const textStyles = [styles.FilterTypeText, selected? styles.FilterTypeTextSelected : styles.FilterTypeTextIdle];
    
    return (
      <TouchableOpacity {...buttonIdGenerator("SelectFilterType"+item.filter)} style={buttonStyles} onPress={() => this.onFilterTypeButtonPress(index)}>
          <View style={styles.FilterTypeRow}>
              <Text style={textStyles}>{item.filter}</Text>
                    {(selected || count==0)? null : <Text style={styles.FilterTypeNumberText}>{count}</Text>}
          </View>
          { index !== 0? null :
              <Collapsible collapsed={selected || this.state.Category === null}>
                   <Text style={styles.FilterTypeCategoryOptionText}>{this.state.CategoryOptionSelected}</Text>
              </Collapsible>
          }
      </TouchableOpacity>
    );
}

 

//a utility function to return the current selected filter type(on left side )
getCurrentlySelectedFilterType = () => {
  const current = this.state.filterType.find((element) => element.selected);
      if(current) {
          return current.filter;
      }
  console.log("Fatal Error: no filter type is selected!");
}



constructFilterType = (dynamicFilters, initial = false) => {
    if(initial) {
        let filterType = staticFilters.map((item) => ({filter: item, selected: false, count: 0}));
        return [{filter: 'Category', selected: true, count: 0}, ...filterType];
    } 
    else {
        let staticFilterType = this.state.filterType.filter((item) => staticFilters.includes(item.filter));
        // let dynamicFilterType = dynamicFilters.map((item) => ({filter: item, selected: false, count: 0}));
        let dynamicFilterType = dynamicFilters.map((item) => ({filter: item, selected: false, count: 0}));
        return [{filter: 'Category', selected: true, count: 1}, ...dynamicFilterType, ...staticFilterType];
    }
}



//helper function for searching inside the array of objects
// searchInsideEavData = (value, array) => {
//   console.log('searchInsideEavData',value,array)
//     for (var i=0; i < array.length; i++) {
//         if (array[i].id === value) {
//             return array[i];
//         }
//     }
// }


// capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

clearDynamicFilterOption = (categoryOption) => {
    if(categoryOption == null)  return;
    //const dynamicFilters = filterOptionsForCategory.find((item) => item.option == categoryOption).dynamicFilter;
    // dynamicFilters.forEach((item) => this.setState({[item]: []}))
    for (var i = dynamicFiltersList.length - 1; i >= 0; i--) {
        this.setState({[dynamicFiltersList[i]]:[]})
    }
}

onCatlogOptionPress = (stateName,stateValue) =>{
  //console.log('onCatlogOptionPress',stateName,stateValue)
  if(stateName==="sell_full_catalog")
       this.setState((prevState) => ({...prevState,sell_full_catalog:stateValue}));
  else if(stateName==="ready_to_ship")
       this.setState((prevState) => ({...prevState,ready_to_ship:stateValue}));
  else if(stateName==='delete')
       delete this.state[stateValue] 
}

onCategoryOptionPress = async (categoryOption,id) => {
  //console.log("onCategoryOptionPress: option, id", categoryOption, id)
  // this.props.dispatch(getEavCategoriesAction(id));
  this.clearDynamicFilterOption(this.state.Category);
  //console.log({categoryOption, categoryinState: this.state.Category})
  const { response, error } = await execute(getEavCategories, getEavCategoriesAction(id))
  if(error || !response) {
    return;
  }
  if(response!=[]&&response.length>0){
    // console.log('dynamicFilters',response);
    let name;
    if(response[0].attribute_name=='size'){
          name="Size";
    }
    else if(response[0].attribute_name=='stitching_type'){
          name="Stitch";
    }
    // this.clearDynamicFilterOption(this.state.Category,name); 
    const filterType = this.constructFilterType([name]);
    //console.log("constructed filterType", filterType);
    this.setState((prevState) => ({...prevState, filterType: filterType, Category: id,CategoryOptionSelected:categoryOption}));
  }
  else{
    // console.log('doesnt have dynamicFilters')  
    let dynamicFilterType =emptyFilter;
    // this.clearDynamicFilterOption(this.state.Category,[]);       
    const filterType = this.constructFilterType([]);
    this.setState((prevState) => ({...prevState, filterType: filterType, Category:id,CategoryOptionSelected:categoryOption})); 
  }
}

onFilterOptionPress = (index, radio) => {
  // console.log("Whole state of filter",this.state);
    const filterType = this.getCurrentlySelectedFilterType();
      const filterOption = filterType;
        // console.log("filtertype, index, radio", filterType, index, radio);
          const prevState = (filterOption in this.state)? this.state[filterOption] : []
        // console.log("prevstate", prevState)
        let updatedFilterOption = []
          if(!radio) {
              updatedFilterOption = [index];
          } 
          else {
              const found = prevState.includes(index);
              // console.log("found", found);
                if(found) {
                  updatedFilterOption = prevState.filter((item) => index!==item);
                } 
                else {
                  updatedFilterOption = [...prevState, index];
                }
          }
  const count = updatedFilterOption.length;
    let updatedFilterType = _.cloneDeep(this.state.filterType);
      updatedFilterType.find((item) => item.filter == filterType).count = count;
        this.setState((prevState) => ({...prevState, filterType: updatedFilterType, [filterOption]: updatedFilterOption}))
}

getUIStateFromParam = (filterType, param) => {
  const values = param.split(',').map(i => Number.parseInt(i))
  const count = values.length
  return {count, values}
}

jsonConvertToUI = async (object) =>{
  let obj={};
  let objCount = {}
    //console.log('[jsonConvertToUI]old object',object)
      for (var key in object) {
          // if (object.hasOwnProperty(key)&&this.initialState.hasOwnProperty(key)) {
          // }
           if(key in serverToUiFilterType){
            let data=object[key];
            let filterType = serverToUiFilterType[key]
            let { count, values } = this.getUIStateFromParam(filterType, data)
            objCount[filterType] = count;
            obj[filterType] = values 
          }
          else if(key==='work'){
            let data=object[key];
           obj['Work']=data.split(',');;
          }
          else if(key==='state'){
            let data=object[key];
            obj['State']=data.split(',');
          }
          else if(key==='size'){
            let data=object[key];
            if(data.length===0)
            delete object['Size'];
            else
            obj['size']=data.split(',');
          }
          else if(key==='fabric'){
            let data=object[key];
            obj['Fabric']=data.split(',');
          }
          else if(key==='stitching_type'){
            let data=object[key];
            if(data.length===0)
            delete object['Stitch'];
            else
            obj['Stitch']=data.split(',');
          }
          else if(key==='min_price'){

            const minPrice = Number.parseInt(object[key])
            let minIndex = serverToUiMinPrice.findIndex(i => minPrice <= i)
            // console.log("minIndex", minIndex);
            minIndex = minIndex === -1? 8 : minIndex;

            const maxPrice = Number.parseInt(object['max_price'])
            // console.log("maxPrice", maxPrice);
            let reversed = serverToUiMinPrice.slice().reverse()
            // console.log('reversed', reversed)
            let maxIndex = reversed.findIndex(i => maxPrice >= i)
            // console.log("maxIndex", maxIndex);
            maxIndex = maxIndex === -1? 0 : maxIndex
            maxIndex = serverToUiMinPrice.length - maxIndex - 1;

            let priceUi = []
            for(let i=minIndex; i<=maxIndex; i++) {
              priceUi.push(i)
            }
            obj['Price'] = (maxPrice === minPrice && maxPrice === 5000)? [8] : priceUi;
            objCount['Price'] = obj['Price'].length
          }
          else if(key==='category'){
            if(object['category']===null)
            delete object['category'];
            else {
              const id = Number.parseInt(object['category'])
              obj['Category']= id
              await this.onCategoryOptionPress(this.props.filterDataCategory.find(i => i.id === id).category_name, id)
            }
          }
          else if(key==='product_type'){
            obj["product_type"]=object["product_type"]
          }
          else if(key==="ready_to_ship"){
            obj["ready_to_ship"]=object["ready_to_ship"]
          }
          else if(key==="style"){
            obj["Style"]=object["Style"]
          }
          else if(key === 'sell_full_catalog') {
            obj[key] = object[key];
          }
          else{
              let newKey=key.toLowerCase();
              // obj[newKey]=object[key];
             // delete this.state[key] 
            //  console.log('discarded keys',key)
          }
      }
      // console.log('new object is ',obj)
      const updatedFilterType = _.cloneDeep(this.state.filterType)
      for(key in objCount) {
        const filterTypeIndex = updatedFilterType.findIndex(i => i.filter === key)
        if(filterTypeIndex === -1) {
          // console.log("FATAL: cannot find filter type")
          continue;
        }
        updatedFilterType[filterTypeIndex].count = objCount[key]
      }
      obj['filterType'] = updatedFilterType
      return obj
}

jsonRequestParseUtil = (object) =>{
  let obj={};
  //&&key!=='product_type'&&key!=='ready_to_ship'
  // console.log('[jsonRequestParseUtil]old object',object)
      for (var key in object) {
          // if (object.hasOwnProperty(key)&&this.initialState.hasOwnProperty(key)) {
          // }
           if(key==='Brand'){
            let data=object[key];
            obj['brand']=data.toString();
          }
           if(key==='Work'){
            let data=object[key];
           obj['work']=data.toString();;
          }
           if(key==='State'){
            let data=object[key];
           obj['state']=data.toString();;
          }
           if(key==='Size'){
            let data=object[key];
            if(data.length===0)
            delete object['Size'];
            else
            obj['size']=data.toString();
          }
           if(key==='Fabric'){
            let data=object[key];
            obj['fabric']=data.toString();;
          }
           if(key==='Stitch'){
            let data=object[key];
            if(data.length===0)
            delete object['Stitch'];
            else
            obj['stitching_type']=data.toString();
          }
          if(key==='Price'){
            // console.log("PRICE: ", object[key])
            const min = Math.min(...object[key])
            const max = Math.max(...object[key])
            // console.log("min,max", min,max)
            obj['min_price']=this.calculateMinPrice(min);
            obj['max_price']=this.caculateMaxPrice(max)
          }
           if(key==='Category'){
            if(object['Category']===null||object['Category']===undefined)
            delete object['Category'];
            else
            obj['category']=object['Category'];
          }
          if(key==='product_type'){
            obj["product_type"]=object["product_type"]
          }
          if(key==="ready_to_ship"){
            obj["ready_to_ship"]=object["ready_to_ship"]
          }
          if(key==="Style"){
            obj["style"]=object["Style"].toString();
          }
          if(key==='sell_full_catalog') {
            obj[key] = object[key];
          }
          else{
              let newKey=key.toLowerCase();
              // obj[newKey]=object[key];
             // delete this.state[key] 
             //console.log('discarded keys',key)
          }
      }
      // console.log('new object is ',obj)
      return obj;        
}
// shouldComponentUpdate(nextProps, nextState) {
//  if(this.state!==nextState)
//   return true; 
//  else
//   return false;  
// }



//component to view options for the selected filters     
getFilterOptionUI = () => {
    //case if category filter is selected , have dynamic layout depending on the option choosen 
  if(this.getCurrentlySelectedFilterType() == 'Category') {
      return (
             this.props.filterDataCategory.length===0?
                 <Spinner color={colorresource.liteblue} /> 
                : 
                <FlatList
                    data={this.response_data(this.getCurrentlySelectedFilterType())}
                    keyExtractor={item => item.id.toString()}
                    extraData={this.state}
                    renderItem={({item}) => {
                    return (
                      <FilterOption
                      onPress={() => this.onCategoryOptionPress(item.category_name,item.id)}
                      radio={true}
                      text={item.category_name}
                      selected={this.state.Category===item.id}
                      testIds={buttonIdGenerator("CategoryOption"+item.id)}
                      />
                    );
                }} />
      );
  }
  else if(this.getCurrentlySelectedFilterType() !== 'Catalog') {
    return (
         <FilterOptionList currentFilter={this.getCurrentlySelectedFilterType()} filterState={this.state[this.getCurrentlySelectedFilterType()]} onPress={this.onFilterOptionPress} response_data={this.response_data(this.getCurrentlySelectedFilterType())} />
    );
  } 
  else {
    return (
          <CatalogOptionUI onPress={this.onCatlogOptionPress} catalog_predefined_filter_Selected={this.state.ready_to_ship} catalog_Selected={this.state.sell_full_catalog}/>
    );
  }
}

getSubText = (requestData) => {
  // console.log("[getSubText] requestData", requestData)
  // const last = Object.keys(requestData).length;
  // console.log("[getSubText] last", last)
  // const referenceSorter = _.map(savedFilterParamOrder, '0')
  // console.log("[getSubText] ref sorter", referenceSorter)
  // const sortedReqestData = _.sortBy(Object.entries(requestData), i => {
  //   const index = referenceSorter.indexOf(i[0])
  //   // console.log("[getSubText:sortBy] i, index", i, index)
  //   return index === -1? last : index
  // })
  // console.log("[getSubText] sorted", sortedReqestData)

  let saveFilterSubText=[];
  savedFilterParamOrder.forEach(paramObj => {
    const key = paramObj[0]
    const valuePicker = paramObj[1]
    const capitalizedKey = _.capitalize(key)
    const filterValue = requestData[key]
    const data = filterValue && this.response_data(serverToUiFilterType[key] || capitalizedKey)

    if(key === 'ready_to_ship' && filterValue !== null && filterValue !== undefined) {
      saveFilterSubText.push(filterValue? 'Ready to ship' : 'Pre-Launch')
    } 
    else if(key === 'sell_full_catalog' && filterValue !== null && filterValue !== undefined) {
      saveFilterSubText.push(filterValue? 'Full Catalog' : 'Single Piece')
    } 
    else if(key === 'product_type' && filterValue) {
      saveFilterSubText.push(filterValue)
    }
    else if((key === 'min_price' || (key === 'max_price' && filterValue !== requestData['min_price'])) && filterValue !== null && filterValue !== undefined) {
      saveFilterSubText.push(filterValue)
    }
    else if(data && valuePicker && filterValue){
      // console.log("[getSubText] filterValue", filterValue)
      const arrayOfIds = String(filterValue).split(',').map((n) => Number.parseInt(n))
      // console.log("[getSubText] arrayOfIds", arrayOfIds)
      const found = data.filter(i => arrayOfIds.includes(i.id))
      // console.log("[getSubText] found", found)
      const arrayOfValues = found.map(valuePicker)
      // console.log("[getSubText] arrayOfValues", arrayOfValues)
      const commaSeparated = arrayOfValues.join(',')
      // console.log("[getSubText] commaSeparated", commaSeparated)
      saveFilterSubText.push(...arrayOfValues)
    }
    else {
      // console.log("[getSubText] TODO: handle this key", key)
    }
    // console.log("[getSubText] savefiltersubtext", saveFilterSubText)
  })

  return saveFilterSubText.join(',')

  // for (let [key, value] of (sortedReqestData)) {
  //   if(value!==undefined&&value!==null&&value!=='') {
  //     console.log("[getSubText] key, value", key, value)
  //     const keyCapitalized = _.capitalize(key)
  //     const data = this.response_data(keyCapitalized)
  //     if(data && data.length>0) {
  //       console.log("[getSubText] data[0]", data[0])
  //       const found = data.find(savedFilterParamOrder.find(i => i[0] === key)[1])
  //       console.log("[getSubText] retrieved", found)
  //     } else {
  //       console.log("[getSubText] data undefined")
  //     }
  //     saveFilterSubText+=value+',';
  //   }
  // }


}

setSubTextSaveFilter = (requestData) =>{
  const saveFilterSubText = this.getSubText(requestData)
  this.setState({saveFilterSubText:saveFilterSubText,showSaveFilterModal:false},()=>{
    this.props.dispatch(saveFilterServerAction(this.state.saveFilterText,this.state.saveFilterSubText,JSON.stringify(requestData)));
  })
}

saveFilterToServer = () =>{

  if(this.state.saveFilterText===null||this.state.saveFilterText===''){

  }
  else{
      if( JSON.stringify(this.state) !== JSON.stringify(this.initialState) ){
        let requestData=this.jsonRequestParseUtil(this.state);
        this.setSubTextSaveFilter(requestData);
        goToProductsTab({filters:requestData});  
      }
      else{
        goToProductsTab();
      }
    }
}

dismissSaveFilterModal = () =>{
  this.setState({showSaveFilterModal:false})
}

//fetching the categories filter options   
async componentDidMount(){
  // if(this.props.filterApplied==true){
  //     let filter = this.jsonConvertToUI(this.props.filterScreenState)
  //     this.setState(filter)
  // }

  // await waitTillUserInfoIsFetched()
  //  this.props.dispatch(getCategoriesAction());
  let filter =this.convertMapToJson(this.props.localFilterStateMap);
  const filterUI = await this.jsonConvertToUI(filter);
  this.setState({filter, Category:this.props.localFilterStateMap.get("category"), ...filterUI})
  if(this.props.filterDataCategory.length === 0) {
    this.props.dispatch(getCategoriesAction());
  }
}

convertMapToJson(map){
  let object={}
  if(!map) {
    return object
  }
  // console.log("[convertMapToJson] map", map);
  map.forEach((value, key) => {
  object[key]=value
  })
  return object;
}
onFocusUtility(){
    // let filter =this.convertMapToJson(this.props.localFilterStateMap);
    // const filterUI = this.jsonConvertToUI(this.props.localFilterStateMap);
    // this.setState({filter:filter,Category:this.props.localFilterStateMap.get("category"), ...filterUI})
    // if(this.props.filterDataCategory.length === 0) {
    //   this.props.dispatch(getCategoriesAction());
    // }
}


render() {
  // console.log('filter render',this.state.filter)
  return (
    <Container style={{backgroundColor:'lightgrey'}}>
      <Header style={styles.Header}>
      <NavigationEvents
      // onWillFocus={payload => console.log('onWillFocus')}
      onDidFocus={this.onFocusUtility}
      // onWillBlur={payload => console.log('will blur',payload)}
      // onDidBlur={payload => console.log('onDidBlur')}
    />
          <Left>
              <Button transparent {...buttonIdGenerator("Back")} onPress={() => this.props.navigation.goBack()}>
                  <Icon style={{color: colorresource.liteblue, fontSize: 24}} name='arrow-back' />
              </Button>
          </Left>
          <Body>
              <Title style={{color: colorresource.liteblue}}>Filter</Title>
          </Body>
          <Right>
              <Button {...buttonIdGenerator("ClearAllFilter")} hasText transparent onPress={() => {this.reset()}}>
                  <Text style={{color: colorresource.liteblue}}>clear all</Text>
              </Button>
          </Right>
      </Header>
      <View style={{flex: 1, flexDirection:'row'}}>
          <View style={{flex: 0.35, backgroundColor: colorresource.Verylightgray}}>
            <FlatList
                data={this.state.filterType}
                renderItem={this.renderFilterType}
                ItemSeparatorComponent={() => <View style={{backgroundColor: colorresource.litegray, height: 0.5, width:'100%'}}/>}
                keyExtractor={(item,index) => index.toString()}
            />
          </View>
          <View style={{flex: 0.65, backgroundColor: 'white'}}>
                {
                  this.getFilterOptionUI()
                }
          </View>
      </View>
        <Footer style={{backgroundColor: 'white', borderTopWidth: 1, borderTopColor:'black'}}>
              <TouchableOpacity style={styles.FooterLeft} {...buttonIdGenerator("SaveFilter")} onPress={()=>this.setState({showSaveFilterModal:true})}>
                    <Text uppercase={true}  style={{color: 'white'}}>save filter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.FooterRight} {...buttonIdGenerator("ApplyFilter")}
                    onPress={()=>{
                      if( JSON.stringify(this.state) !== JSON.stringify(this.initialState) ){
                        let requestData=this.jsonRequestParseUtil(this.state);
                        goToProductsTab({filters:requestData});  
                      }
                      else{
                        goToProductsTab();
                      }
                    }
                    }>
                  <Text uppercase={true} style={{color: colorresource.liteblue}}>apply</Text>
              </TouchableOpacity>
        </Footer>
        {
           <Modal
           animationType="slide"
           transparent={true}
           visible={this.state.showSaveFilterModal}
           onRequestClose={()=>this.setState({showSaveFilterModal:false})}
           style={{margin: 0}}
           >
               <View  style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
               <View style={{flexDirection:'column',padding:15,backgroundColor:'white',marginHorizontal:30}}>
                <Text style={{fontSize: 20,color:'black',paddingBottom:10}}>Save Filter</Text>
                {/* <TextInput
                    underline={true}
                    underlineColorAndroid={colorresource.black}
                    // style={{width:width*0.1,alignContent:'center',padding:10}}
                    onChangeText={(text) => this.setState({saveFilterText:text})}
                    value={this.state.saveFilterText}
                    />  */}
                <TextInputKeyed
                  label={'Filter name'}
                  onChange={(text) => this.setState({saveFilterText:text})}
                  value={this.state.saveFilterText}
                />
                <View style ={{paddingVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                      <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                          <TouchableHighlight onPress={this.dismissSaveFilterModal}>
                              <Text style={{fontSize: 18,color:'black'}}>CANCEL</Text>
                          </TouchableHighlight>
                      </View>
                      <View style={{justifyContent:'center',alignItems:'center',paddingHorizontal:5}}>
                      <TouchableHighlight underlayColor={'transparent'} onPress={this.saveFilterToServer}>
                      {
                        this.state.saveFilterText===null||this.state.saveFilterText===''?
                        <Text style={{fontSize: 18,color:'gray'}}>SAVE</Text>
                        :
                        <Text style={{fontSize: 18,color:'black'}}>SAVE</Text>
                      }
                      </TouchableHighlight>                 
                </View> 
                </View>     
    
                </View>
               </View>
          </Modal>      
        }
      </Container>
    );
  }
}


const mapStateToProps = (state,props) => {
  return {
     filterDataBrand:state.brandsR.responseAllBrands,
     filterDataFabric:state.enumgroupR.responseFabrics,
     filterDataWorks:state.enumgroupR.responseWorks,
     filterDataStyle:state.enumgroupR.responseStyles,
     filterDataState:state.stateR.responseGetOrderedStates,
     localFilterStateMap:props.navigation.getParam('localFilterStateMap', initialLocalFilterStateDEBUG),
     product_type:props.navigation.getParam('product_type', 'catalog'),
     filterDataCategory:state.categoryR.responseCategory,
     filterDataEavCategory:state.categoryR.responseEavCategory,
     filterScreenState:state.productFilterR.filterScreenState,

  };
};

export default connect(mapStateToProps)(Filter);
