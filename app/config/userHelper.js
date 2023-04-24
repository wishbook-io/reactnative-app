import _ from 'lodash';

/*
Don't use methods starting with _ (underscore)
they are meant to be private
*/

class UserHelper{
  
  constructor(){
    this.userInfo = {};
    this.latestCartId = null;
  }
  
  setUserInfo = (userInfo)=>{
    this.userInfo = _.cloneDeep(userInfo);
    // console.log('userinfo setUserInfo',this.userInfo.company)
  }
  
  setLatestCartId = (cartId) => {
    console.log("[UserHelper:setLatestCartId] cartId -> cartId", this.latestCartId, cartId)
    this.latestCartId = cartId
  }

  getLatestCartId = () => {
    return this.latestCartId
  }
  
  setUserApprovalStatus = (status) => {
    this.userApprovalStatus = status
  }
  
  getUserApprovalStatus = () => {
    return this.userApprovalStatus
  }
  
  isUserApprovalStatus = (status) => {
    return this.getUserApprovalStatus() === status
  }
  
  updateUserCompany = (userCompany) => {
    // console.log("[updateUserCompany] before", this.userInfo)
    this.userInfo = {
      ...this.userInfo,
      company: {
        ...this.userInfo.company,
        ...userCompany
      }
    }
    // console.log("[updateUserCompany] after", this.userInfo)
  }
  updateUserProfile = (userProfile) => {
    // console.log("[updateUserProfile] before", this.userInfo)
    this.userInfo = {
      ...this.userInfo,
      ...userProfile,
    }
    // console.log("[updateUserProfile] after", this.userInfo)
  }
  
  updateCompanyGroupFlag = (companyGroupFlag) => {
    this.userInfo = {
      ...this.userInfo,
      companyuser: {
        ...this.userInfo.companyuser,
        company_group_flag: {
          ...this.userInfo.companyuser.company_group_flag,
          ...companyGroupFlag,
        }
      }
    }
  }

  getUserId = ()=>{
    // console.log('getUserId',this.userInfo.company)
    let id = this.userInfo.id===undefined?null:this.userInfo.id   
    return id;
  }
  
  helperCompanyType(){
    // console.log('getCompanyType',this.userInfo)
    
    if (this.userInfo.companyuser.company_group_flag.manufacturer  
      && !this.userInfo.companyuser.company_group_flag.wholesaler_distributor
      && !this.userInfo.companyuser.company_group_flag.online_retailer_reseller 
      && !this.userInfo.companyuser.company_group_flag.broker
      && !this.userInfo.companyuser.company_group_flag.retailer) 
    {
      return "seller";
    }
    else if (!this.userInfo.companyuser.company_group_flag.manufacturer 
      &&!this.userInfo.companyuser.company_group_flag.wholesaler_distributor
      &&!this.userInfo.companyuser.company_group_flag.online_retailer_reseller 
      &&!this.userInfo.companyuser.company_group_flag.broker
      &&this.userInfo.companyuser.company_group_flag.retailer 
      ||!this.userInfo.companyuser.company_group_flag.manufacturer
      &&!this.userInfo.companyuser.company_group_flag.wholesaler_distributor
      &&this.userInfo.companyuser.company_group_flag.online_retailer_reseller 
      &&!this.userInfo.companyuser.company_group_flag.broker
      &&!this.userInfo.companyuser.company_group_flag.retailer
      ||!this.userInfo.companyuser.company_group_flag.manufacturer 
      &&!this.userInfo.companyuser.company_group_flag.wholesaler_distributor
      &&this.userInfo.companyuser.company_group_flag.online_retailer_reseller 
      &&!this.userInfo.companyuser.company_group_flag.broker
      &&this.userInfo.companyuser.company_group_flag.retailer) 
    {
      // TODO: this condition can be simplified as
      // const flag = this.userInfo.companyuser.company_group_flag
      // if(!flag.manufacturer && !flag.wholesaler_distributor && !flag.broker && (flag.online_retailer_reseller || flag.retailer)) 
      return "buyer"    
    } 
    else {
      return "all"    
    }
  }
      
  getCompanyType (){
    // console.log('getCompanyType',this.userInfo)
    let company_type = this.userInfo.companyuser===undefined?"buyer":this.helperCompanyType();
    return company_type;
  }
  
  isUserBuyer = () => {
    const flag = this.getCompanyType() === 'buyer'
    return flag;
  }
  
  isUserReseller = () => {
    const isReseller = _.get(this.userInfo, 'companyuser.company_group_flag.online_retailer_reseller', false)
    return isReseller
  }
  
  isUserRetailer = () => {
    const isRetailer = _.get(this.userInfo, 'companyuser.company_group_flag.retailer', false)
    return isRetailer
  }
  
  canUserResell = () => {
    const isReseller = this.isUserReseller()
    const canResell = isReseller || this.isUserRetailer()
    return canResell
  }

  isUserCompanyTypeFilled = () => {
    const filled = _.get(this.userInfo, 'company.company_type_filled')
    return filled;
  }
      
  getUserIsGuest() { 
    if(this.userInfo.company===undefined){
      // console.log('guest1',this.userInfo['company'],this)
      return true;
    }
    else{
      if (!this.userInfo.company.is_profile_set ||! this.userInfo.company.company_type_filled){
        // console.log('guest2',this.userInfo.company.is_profile_set,this.userInfo.company.company_type_filled)
        return true
        // console.log('guest2',this.userInfo.company.is_profile_set,this.userInfo.company.company_type_filled)
      }
      else return false;
      
    }
  }
  
  getUserAutoShareCatalogs = () => {
    return this.userInfo.company.push_downstream === 'yes'
  }
  
  getUserCompanyCountryId = () => {
    return this.userInfo.company.country;
  }
  
  getUserCompanyStateId = () => {
    return this.userInfo.company.state;
  }
  
  getUserCompanyCityId = () => {
    return this.userInfo.company.city;
  }
  
  getUsercompanyCity(){
    return this.userInfo.company_group_flag.city
  }
  getUsercompany_id(){
    let id = this.userInfo.companyuser===undefined?"1":this.userInfo.companyuser.company;
    return  id;
  }
  
  getCompanyname(){
    // return this.userInfo.companyuser.company_group_flag.name 
    // <--- Not using the above because it might not be updated, if company name is changed
    return this.userInfo.company.name 
  }
  getUserCompanyAddress(){
    return this.userInfo.companyuser.address
  }
  getUserName(){
    return this.userInfo.username
  }
  getUserFirstName(){
    return this.userInfo.first_name
  }
  getUserLastName(){
    return this.userInfo.last_name
  }
  getUserEmail(){
    return this.userInfo.email
  }
  getUserMobile(){
    return _.get(this.userInfo, 'userprofile.phone_number')
  }
  getUserLanguage() {
    return _.get(this.userInfo, 'userprofile.language')
  }
  getPaytmMobile = () => {
    return this.userInfo.company.paytm_phone_number
  }
  getUserGroupstatus(){
    return this.userInfo.groups[0]
  }
      
  getCompanyGroupId = () => {
    const groupId = _.get(this.userInfo, 'companyuser.company_group_flag.id');
    return groupId
  }
  
  getAllCompanyTypeText = () => {
    // do some checks here first
    const groupFlag = _.property('companyuser.company_group_flag')(this.userInfo);
    if(groupFlag) {
      const sequencedStrings = this._companyGroupFlagToStringMapper(groupFlag)
      const allCompanyTypeText = sequencedStrings.join(', ');
      return allCompanyTypeText;
    }
    
    return "";
  }
  
  getCompanyAddressId = () => {
    const addressId = _.property('companyuser.address')(this.userInfo);
    if(addressId) {
      return addressId
    }
    
    return null;
  }
  
  getDefaultResaleMargin = () => {
    return _.get(this.userInfo, 'company.advancedcompanyprofile.resale_default_margin')
  }
      
  // private methods
  
  /*
  this function returns an array: 
  ['Manufacturer', 'Wholesaler Distributor', 'Online-Retailer Reseller', ...] 
  depending on the group flag respecting the sequence of the mapper
  
  company_group_flag:
  broker: true
  city: "Surat"
  company: 2241
  created: "2018-07-12T12:47:15.601187Z"
  id: 3426
  manufacturer: false
  modified: "2018-11-06T10:59:01.064089Z"
  name: "Jay Company1"
  online_retailer_reseller: true
  phone_number: "9925024856"
  retailer: true
  wholesaler_distributor: true
  */
  _companyGroupFlagToStringMapper = (companyGroupFlag) => {
    const sequencedMapper = [
      {
        manufacturer: 'Manufacturer'
      },
      {
        wholesaler_distributor: 'Wholesaler Distributor'
      },
      {
        online_retailer_reseller: 'Online-Retailer Reseller'
      },
      {
        broker: 'Broker'
      },
      {
        retailer: 'Retailer'
      }
    ];
    
    let sequencedStrings = []
    sequencedMapper.forEach((item) => {
      const key = Object.keys(item)[0]
      if(Object.keys(companyGroupFlag).includes(key) && companyGroupFlag[key] === true) {
        sequencedStrings.push(item[key])
      }
    })
    
    return sequencedStrings;
  }
  
  
}

const userHelper = new UserHelper();
export default userHelper;
    
    
    
    
    