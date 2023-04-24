import React, { Component } from 'react';
import { 
    Text, 
    ScrollView,	
    View,	
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    Alert,
	StatusBar,
    Image,
    Switch,
} from 'react-native';
import {
    Icon as NBIcon,
    Button,
    Content,
    Container,
} from 'native-base';
import { TouchableRipple, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import Dialog from 'react-native-dialog';

import { Badge } from 'app/components/Header/GenericHeader'
import { UserAvatar, MenuIcon, MenuItem } from '../../components/MyBussiness';
import Spacer from 'app/components/Spacer/Spacer';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import assets from '../../utils/assetsObject';
import UserHelper from '../../config/userHelper';
import { isWeb } from 'app/utils/PlatformHelper';
import consts from '../../utils/const';

import * as navigationAction from '../../actions/navigation-actions'
import { patchResellCompanyTypeAction } from 'app/actions/user-actions';
import { showToastAction } from 'app/actions/toast-actions';
import * as serverHelper from './serverHelper';

import * as debugHelper from 'app/utils/debugHelper'

import { TestIdGenerator } from '../../utils/TestingHelper';
import DownloadWishbookApp from '../products/add/DownloadWishbookApp';
const buttonTestId = TestIdGenerator("MyBusiness", '', "Button");
const textTestId = TestIdGenerator("MyBusiness", '', "Text");

const {width = 0,height = 0} = Dimensions.get('window');

class MyBusiness extends Component {

    onAddProductsPress = () => {
        if(isWeb) {
            this.showDownloadWishbookAppModal();
        } else {
            navigationAction.goToAddProducts();
        }
    }

    showDownloadWishbookAppModal = () => {
        if(!this.downloadWishbookAppRef) {
            return;
        }
        this.downloadWishbookAppRef.showModal();
    }

    registerDownloadWishbookAppRef = (r) => {
        this.downloadWishbookAppRef = r
    }

    onConfirmResellOk = () => {
        const params = {
            online_retailer_reseller: false,
            retailer: true,
        }
        this.props.dispatch(patchResellCompanyTypeAction(params))
    }

    onConfirmResellCancel = () => {
        this.setState({showResellerConfirmationDialog: false})
    }

    onResellerDisabled = () => {
        this.setState({showResellerConfirmationDialog: false, resellerSwitch: false})
    }

    onResellerEnabled = () => {
        this.setState({showResellerConfirmationDialog: false, resellerSwitch: true}, 
            () => this.props.dispatch(showToastAction("You can now create resale orders on Wishbook")))
    }

    onResellerSwitchChange = (value) => {
        if(value) {
            this.props.dispatch(patchResellCompanyTypeAction({online_retailer_reseller: true}))
        } else {
            this.setState({showResellerConfirmationDialog: true})
        }
    }

    onPreferencesPress = () => {
        navigationAction.goToResellPreferences()
    }

    onCustomerAddressesPress = () => {
        navigationAction.goToResellAddresses()
    }

    onPayoutsPress = () => {
        navigationAction.goToResellPayouts()
    }

    onHowToSellPress = () => {
        // navigationAction.goToInAppBrowser('Resell', 'https://www.wishbook.io/resell-and-earn.html')
        navigationAction.goToHowToSell()
    }

    _onItemClick(type) {
        this.props.navigation.navigate(type);
    }

    fullName = () => {
        const name = UserHelper.getUserFirstName() + ' ' + UserHelper.getUserLastName();
        return name;
    }

    companyName = () => {
        const name = UserHelper.getCompanyname();
        return name;
    }

    allCompanyTypeText = () => {
        const text = UserHelper.getAllCompanyTypeText();
        return text;
    }

    userIsBuyer = () =>{
        const flag = UserHelper.getCompanyType()==='buyer'?true:false;
        return flag;
    }

    userIsAll = () =>{
        const flag = UserHelper.getCompanyType()==='all'?true:false;
        return flag;
    }

    userIsSeller = () =>{
        const flag = UserHelper.getCompanyType()==='seller'?true:false;
        return flag;
    }

    constructor(props) {
        super(props)
        this.state = {
            resellerSwitch: UserHelper.isUserReseller(),
            showResellerConfirmationDialog: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.responsePatchReseller !== this.props.responsePatchReseller) {
            if(UserHelper.isUserReseller()) {
                this.onResellerEnabled();
            } else {
                this.onResellerDisabled();
            }
        }
    }


    render() {
        let userIsAll=this.userIsAll()
        let userIsBuyer=this.userIsBuyer()
        let userIsSeller=this.userIsSeller()

        const iconSize = MenuItem.defaultProps.iconSize
        return (
            <Container>
                <Content style={{backgroundColor: colorresource.materialbg}}>
                    <Spacer/>
                    <View style={styles.headerContainer}>
                        <TouchableRipple onPress={() => this.props.navigation.navigate('Profile')}>
                        <View style={styles.userContainer}>
                            <View style={styles.leftContainer}>
                                {/* <UserAvatar width={60} height={60} backgroundColor={'white'} color={colorresource.blue} text={this.fullName()} /> */}
                                <Avatar.Text theme={{colors: {primary: 'white'}}} color={colorresource.liteblue} label={this.fullName().charAt(0).toUpperCase()}/>
                                <Text style={styles.profileText}>{strings('mybussiness.profile')}</Text>
                            </View>
                            <View style={styles.centerContainer}>
                                <Text style={styles.usernameText} {...textTestId('Name')}>{this.fullName()}</Text>
                                <Text style={styles.manufacturerText}>{this.allCompanyTypeText()}</Text>
                                <Text style={styles.companyText} {...textTestId('CompanyName')}>{this.companyName()}</Text>
                            </View>
                            {/* <TouchableHighlight underlayColor={colorresource.black} onPress={() => { }}>
                                <View style={styles.rightContainer}>
                                    <Icon color={'white'} size={30} name={'qrcode'} />
                                    <Text style={styles.scanText}>{strings('mybussiness.scan')}</Text>
                                </View>
                            </TouchableHighlight> */}
                        </View>
                        </TouchableRipple>
                        <View style={styles.myBusinessHeaderRow}>
                            <Text style={styles.myBusinessText} >{strings('mybussiness.my_business')}</Text>

                           {
                               userIsSeller?
                               null
                               :
                               <Button transparent onPress={() => navigationAction.goToCarts()}>
                                    <NBIcon name='cart' type="MaterialCommunityIcons" style={{color:colorresource.white,fontSize:24}}/>
                                    <Badge count={this.props.cartCount}/>
                                </Button>
                           }
                        </View>
                    </View>

                    {(UserHelper.canUserResell())?
                    <View style={{marginBottom: 16}}>
                        <View style={styles.resellerHeading}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: colorresource.liteblue, fontSize: 16}}>Resell on Wishbook</Text>
                                <Image resizeMode='contain' source={assets['ic_new']} style={[{ alignSelf: 'flex-end', padding: 5, margin: 5, width: iconSize*2, height: iconSize*2*9/16 }]} />
                            </View>
                            <Switch value={this.state.resellerSwitch} onValueChange={this.onResellerSwitchChange}/>
                        </View>
                        {UserHelper.isUserReseller()?
                        <>
                            <View style={styles.menuContainer}>
                                <MenuIcon iconName={'ic_how_to_sell'} title={strings('mybussiness.how_to_sell')} onPress={this.onHowToSellPress} testId={buttonTestId('WbMoney')}/>
                                <MenuIcon iconName={'ic_payouts'} title={strings('mybussiness.payouts')} onPress={() => navigationAction.goToResellPayouts()} testId={buttonTestId('ResellPayouts')}/>
                                <MenuIcon iconName={'ic_shared_by_me'} title={strings('mybussiness.shared_by_me')} onPress={() => navigationAction.goToSharedByMe()} testId={buttonTestId('SharedByMe')}/>
                            </View>

                            <View style={styles.menuContainer}>
                                <MenuIcon iconName={'ic_location'} title={strings('mybussiness.customer_addresses')} onPress={() => navigationAction.goToResellAddresses()} testId={buttonTestId('ResellAddresses')}/>
                                <MenuIcon iconName={'ic_preferences'} title={strings('mybussiness.preferences')} onPress={() => navigationAction.goToResellPreferences()} testId={buttonTestId('ResellPreferences')}/>
                            </View> 
                        </>: null}
                    </View>
                    : null}

                    <View style={styles.menuContainer}>
                        <MenuIcon iconName={'ic_wb_money'} title={strings('mybussiness.wb_money')} onPress={() => navigationAction.goToWbMoney()} testId={buttonTestId('WbMoney')}/>
                        <MenuIcon iconName={'ic_wb_rewards'} title={strings('mybussiness.wb_rewards')} onPress={() => navigationAction.goToWbRewards()} testId={buttonTestId('WbRewards')}/>
                        <MenuIcon iconName={'ic_incentives'} title={strings('mybussiness.incentives')} onPress={() => navigationAction.goToIncentives()} testId={buttonTestId('Incentives')}/>
                        {/* <MenuIcon iconName={'ic_my_network'} title={strings('mybussiness.my_network')} onPress={() => { }}/> */}
                    </View>

                    <View style={styles.menuContainer}>
                        <MenuIcon iconName={'ic_my_orders'} title={strings('mybussiness.my_orders')} onPress={() => navigationAction.goToMyOrders()} testId={buttonTestId('MyOrders')}/>
                        {userIsBuyer?
                        null:    
                        <MenuIcon iconName={'ic_my_products'} title={strings('mybussiness.my_products')} onPress={() => navigationAction.goToMyProducts()} testId={buttonTestId('MyProducts')}/>
                        }
                        {/* <MenuIcon iconName={'ic_leads'} title={strings('mybussiness.leads')+'/'+strings('mybussiness.enquiries')} onPress={navigationAction.goToOrdersTab} testId={buttonTestId('LeadsEnquiries')}/> */}
                        {/* <MenuIcon iconName={'ic_my_network'} title={strings('mybussiness.my_network')} onPress={() => { }}/> */}
                    </View>

                    {
                        userIsBuyer?
                        null
                        :
                        <View style={styles.menuContainer}>
                        <MenuIcon iconName={'ic_my_brands'} title={strings('mybussiness.my_brands')} onPress={() => navigationAction.goToMyBrands()} testId={buttonTestId('MyBrands')}/>
                        <MenuIcon iconName={'ic_add_product'} title={strings('mybussiness.add_product')}  onPress={this.onAddProductsPress}  testId={buttonTestId('AddProduct')}/>
                        <MenuIcon iconName={'ic_discount_settings'} title={strings('mybussiness.discount_settings')} onPress={() => navigationAction.goToMyDiscount()} />
                        </View>
                    }

                    {
                        false && userIsBuyer? // TODO: KYC was swapped with AddProducts
                        null
                        :
                    <View style={styles.userMenuContainer}>
                        <MenuIcon iconName={'ic_kyc_bank'} title={strings('mybussiness.kyc_bank')} titleColor={colorresource.liteblue} onPress={() => navigationAction.goToKycBank()} testId={buttonTestId('KycBank')}/>
                        {/* <MenuIcon iconName={'ic_my_followers'} title={strings('mybussiness.my_followers')} titleColor={colorresource.liteblue} onPress={() => { }} /> */}
                        {/* <MenuIcon iconName={'ic_my_viewers'} title={strings('mybussiness.my_viewers')} titleColor={colorresource.liteblue} onPress={() => { this._onItemClick('MyViewers') }} /> */}
                    </View>
                    }
                    {userIsSeller? null :
                        <View style={styles.userMenuContainer}>
                            <MenuIcon iconName={'ic_my_wishlist'} title={strings('mybussiness.my_wishlist')} onPress={() => navigationAction.goToWishlist()} subtitle={this.props.wishlistCount + " Products"} testId={buttonTestId('MyWishlist')}/>
                            <MenuIcon iconName={'ic_brands_i_follow'} title={strings('mybussiness.brands_i_follow')} onPress={() => navigationAction.goToBrandsIFollow()} subtitle={`${this.props.brandsIFollowCount} Brands`}  iconColor={''} testId={buttonTestId('BrandsIFollow')}/>
                        </View>
                    }
                    <View style={styles.columnContainer}>
                        {/* <MenuItem iconName={'ic_wb_money'} new={true} title={strings('mybussiness.wb_money')} onPress={() => { this._onItemClick('MyEarnings') }}  testId={buttonTestId('WbMoney')}/> */}
                        {/* <MenuItem iconName={'ic_buyer_groups'} title={strings('mybussiness.buyer_groups')} onPress={() => { this._onItemClick('BuyerGroups') }} /> */}
                        {/* <MenuItem iconName={'ic_kyc_bank'} title={strings('mybussiness.kyc_bank')} onPress={navigationAction.goToKycBank} testId={buttonTestId('KycBank')}/> */}
                        {/* <MenuItem iconName={'ic_gst'} title={strings('mybussiness.gst')} onPress={() => { this._onItemClick('GSTScreen') }} /> */}
                        {
                            1 || userIsBuyer?
                            null
                            :
                            <MenuItem iconName={'ic_register_new_user'} title={strings('mybussiness.register_new_user')} onPress={() => { this._onItemClick('RegisterNewUserScreen') }} />
                        }
                        {
                            false && userIsBuyer?
                            <MenuItem iconName={'ic_rejected_users'} title={strings('mybussiness.rejected_suppliers')} onPress={() => { this._onItemClick('RejectBuyers') }} />
                            :
                            null
                        }
                        {
                            false && userIsSeller?
                            <MenuItem iconName={'ic_rejected_users'} title={strings('mybussiness.rejected_buyers')} onPress={() => { this._onItemClick('RejectBuyers') }} />
                            :
                            null
                        }
                        {
                            false && userIsAll?
                            <MenuItem iconName={'ic_rejected_users'} title={strings('mybussiness.rejected_users')} onPress={() => { this._onItemClick('RejectBuyers') }} />
                            :
                            null
                        }
                    </View>
                <Dialog.Container visible={this.state.showResellerConfirmationDialog}>
                    <Dialog.Title>{'Confirm opt-out'}</Dialog.Title>
                    <Dialog.Description>{'Are you sure you want to opt-out from Resell on Wishbook'}</Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={this.onConfirmResellCancel}/>
                    <Dialog.Button label="OK" onPress={this.onConfirmResellOk}/>
                </Dialog.Container>
                <DownloadWishbookApp ref={this.registerDownloadWishbookAppRef}/>
            </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        cartCount: state.cartR.cartCount,
        wishlistCount: state.wishlistR.wishlistCount,
        brandsIFollowCount: state.brandsR.brandsIFollowCount,
        userInfo: state.verifyotpR.userInfo,
        responsePatchReseller: state.userR.responsePatchResellCompanyType
    })
}

export default connect(mapStateToProps)(MyBusiness)
