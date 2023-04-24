import React, { Component, Fragment } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import {
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Picker,
  Icon,
  Footer,
} from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import LeadquiryCard from './LeadquiryCard';
import GenericHeader from 'app/components/Header/GenericHeader';
import PaginatedList from 'app/components/List/PaginatedList';
import UserHelper from 'app/config/userHelper'
import { colorresource, getRandomMaterialColor } from 'app/resources/colorresource';
// import * as ApplozicHelper from 'app/utils/ApplozicHelper'

import { getLeadquiryAction, getGroupedLeadsAction } from 'app/actions/order-actions';
import { getLeadquiry, getGroupedLeads } from 'app/saga/order-saga';
import * as navigationActions from 'app/actions/navigation-actions'

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper'; 
import { isDev } from 'app/utils/debugVars';

const DEFAULT_SCREEN_NAME = isDev? 'GroupedLeads' : '';

const SCREEN_NAMES = {
  LEADS: 'Leads',
  GROUPED_LEADS: 'GroupedLeads',
  ENQUIRIES: 'Enquiries',
}

const PICKER_ENQUIRY_TYPE = [
  {
    label: 'All',
    value: 0,
    filter: {status: undefined},
  },
  {
    label: 'Open',
    value: 1,
    filter: {status: 'created'},
  },
  {
    label: 'Resolved',
    value: 2,
    filter: {status: 'resolved'}
  }
]

class Leadquiry extends Component {

  screenSelector = (leads, groupedLeads, enquiries, defaultValue) => {
    const screenName = this.props.navigation.getParam('screenName', DEFAULT_SCREEN_NAME)
    if(screenName === SCREEN_NAMES.LEADS) {
      return leads
    }
    if(screenName === SCREEN_NAMES.GROUPED_LEADS) {
      return groupedLeads
    }
    if(screenName === SCREEN_NAMES.ENQUIRIES) {
      return enquiries
    }
    return defaultValue
  }

  isGroupedLeads = () => {
    return this.screenSelector(false, true, false, false)
  }

  onSearchTextChange = (text) => {
    let updatedState = {searchText: text}
    if(text.length >= 2 || text.length === 0) {
      const searchKey = this.isGroupedLeads()? 'buying_company_name' : 'catalog_title'
      updatedState['params'] = {...this.state.params, [searchKey]: text || undefined}
    }
    this.setState(updatedState)
  }

  onLeadquiryStatusChange = (selectedValue) => {
    this.setState({leadquiryStatus: selectedValue, params: {...this.state.params, ...PICKER_ENQUIRY_TYPE[selectedValue].filter}})
  }

  isEnquiry = () => {
    return this.screenSelector(false, false, true, false)
  }

  onSearchPress = () => {
    this.setState({searchVisible: true})
  }

  onSearchClosePress = () => {
    let updatedState = {
      searchVisible: false, 
      searchText: ''
    }

    const searchKey = this.isGroupedLeads()? 'buying_company_name' : 'catalog_title'
    if(this.state.params[searchKey]) {
      updatedState['params'] = {...this.state.params, [searchKey]: undefined};
    }
    this.setState(updatedState)
  }  

  onDataChange = (data) => {

  }

  keyExtractor = (item) => {
    return item.id.toString()
  }

  onGroupedLeadPress = (item) => {
    // this.setState(updatedState)
    navigationActions.pushLeadquiry({
      status: PICKER_ENQUIRY_TYPE[this.state.leadquiryStatus].label, 
      screenName: SCREEN_NAMES.LEADS, 
      buying_company: item.company_id, 
      buying_company_name: item.company_name,
    })
  }

  renderGroupedLeads = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.onGroupedLeadPress(item)} style={{
        flexDirection: 'row',
        padding: 16,
        marginBottom: 1,
        backgroundColor: 'white',
      }}>
        <View style={{
          height: 50,
          width: 50,
          borderRadius: 50/2,
          backgroundColor: getRandomMaterialColor(item.company_name),
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        }}>
          <Text style={{color: 'white', fontSize: 20}}>{item.company_name[0]}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, color: colorresource.liteblack}} numberOfLines={1}>{item.company_name}</Text>
          <Text style={{color: colorresource.gray, fontSize: 16}} numberOfLines={1}>{item.city_name + ', ' + item.state_name}</Text>
        </View>
        <View>
          <Text style={{color: colorresource.liteblue, fontSize: 16}}>{item.total_enquiry + ' enquiries'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onLeadquiryCardPress = ({buying_user, selling_user}) => {
    const [myId, theirsId] = this.isEnquiry()? [buying_user, selling_user] : [selling_user, buying_user]

    // ApplozicHelper.openChatWithUser({theirs: theirsId, my: myId})
  }

  renderCard = ({item, index}) => {
    const status = _.get(item, 'status', '').toLowerCase() === 'created'? 'Open' : item.status
    
    const created = moment(item.created).utc().local(true)
    // console.log("created", created.format())
    
    const fromNow = created.fromNow()
    // console.log("fromNow: ", fromNow)
    return (
      <LeadquiryCard
      title={item.catalog_title}
      image={item.thumbnail}
      about={item.text}
      status={status}
      fromNow={fromNow}
      onPress={() => this.onLeadquiryCardPress({buying_user: item.buying_company_chat_user, selling_user: item.selling_company_chat_user})}
      />
    );
  }

  getInitialState = () => {
    const myCompanyId = UserHelper.getUsercompany_id()
    const status = this.props.navigation.getParam('status', '')
    // if(status) {
      // console.log("got status", status)
    // } else {
      // console.log("got not status", status);
    // }
    const buyingCompany = this.props.navigation.getParam('buying_company', '')
    let leadquiryStatus = PICKER_ENQUIRY_TYPE.findIndex(i => i.label === status)
    if(leadquiryStatus === -1) {
      leadquiryStatus = 0
    }
    const paramStatus = PICKER_ENQUIRY_TYPE[leadquiryStatus].filter
    return ({
      leadquiryStatus,
      // the index representing what is the filter status

      params: {
        ...this.screenSelector(
          {selling_company: myCompanyId, buying_company: buyingCompany},
          {},
          {buying_company: myCompanyId},
          {}),
        ...paramStatus,
      }
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      showContent: true,
      // for debugging purposes 
      
      searchVisible: false,
      searchText: '',

      ...this.getInitialState(),
    }
  }

  componentDidMount() {
    // waitTillUserInfoIsFetched().then(() => this.props.dispatch(getLeadquiryAction({selling_company: 4269})))
    if(this.state.showContent === false) {
      waitTillUserInfoIsFetched().then(() => this.setState({showContent: true, ...this.getInitialState()}))
    }
  }

  render() {
    if(!this.state.showContent) {
      return <Text>Processing...</Text>
    }
    return (
      <Container>
        <GenericHeader
        title={this.screenSelector(this.props.navigation.getParam('buying_company_name', 'Leads'), 'Leads', 'Enquiries')}
        />
        <View 
        style={{
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          elevation: 5,
          // borderWidth: 0.5, 
          // borderColor: 'red'
        }}>
          
          {this.state.searchVisible?
            <Fragment>
              <View style={{flex: 1}}>
                <TextInput
                placeholder={'Search by name'}
                onChangeText={this.onSearchTextChange}
                />
              </View>
              <TouchableOpacity style={{marginRight: 10}} onPress={this.onSearchClosePress}>
                <Icon name='close' style={{color: colorresource.gray, fontSize: 20}}/>
              </TouchableOpacity>
            </Fragment>
          :
            <Fragment>
              <View style={{width: 150}}>
                <Picker
                mode={'dropdown'}
                selectedValue={this.state.leadquiryStatus}
                onValueChange={this.onLeadquiryStatusChange}
                >
                  {PICKER_ENQUIRY_TYPE.map((item) => <Picker.Item label={item.label} value={item.value} key={item.label}/>)}
                </Picker>
              </View>
              <TouchableOpacity style={{marginRight: 10}} onPress={this.onSearchPress}>
                <Icon name='search' style={{color: colorresource.liteblue}}/>
              </TouchableOpacity>
            </Fragment>
          }
        </View>
        <Content contentContainerStyle={{flexGrow: 1, backgroundColor: colorresource.materialbg}}>
          <PaginatedList
          renderItem={this.isGroupedLeads()? this.renderGroupedLeads : this.renderCard}
          keyExtractor={this.isGroupedLeads()? (item, index) => index.toString() : this.keyExtractor}
          saga={this.isGroupedLeads()? getGroupedLeads : getLeadquiry}
          actionCreator={this.isGroupedLeads()? getGroupedLeadsAction : getLeadquiryAction}
          onDataChange={this.onDataChange}
          params={this.state.params} 
          />
        </Content>
        <View style={{backgroundColor: 'rgba(255,255,255,0.25)'}}>
          <Text style={{fontSize: 14, textAlign: 'center'}}>This feature is under development</Text>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}

export default connect(mapStateToProps)(Leadquiry)

// 1a79888ef6d0fa76c522ea56a251b4fb9

/* <meta-data
android:name="com.applozic.application.key"
android:value="1a79888ef6d0fa76c522ea56a251b4fb9" /> */
