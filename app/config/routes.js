import React from "react";
import { 
  createStackNavigator, 
  createDrawerNavigator, 
  createBottomTabNavigator, 
  createSwitchNavigator, 
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { StatusBar } from 'react-native';
import { strings } from '../utils/i18n';
import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/login/LoginScreen';
import VerifyotpScreen from '../screens/login/VerifyotpScreen';
import ForgotOtpScreen from '../screens/forgotpassword/forgotOtpScreen';
import LanguageScreen from '../screens/language/LanguageScreen';
import AppIntroScreen from '../screens/appintro/AppIntroScreen';
import HomeScreen from '../screens/home/HomeScreen';
import WebViewScreen from '../screens/webview/WebViewScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChangePasswordScreen from '../screens/changepassword/ChangePasswordScreen';
import TabScreenNavigator from '../screens/home/TabScreenNavigator';
import RegistrationScreen from '../screens/registration/RegistrationScreen';
import InitialRegistration from '../screens/registration/InitialRegistration';
// import EnterMobileScreen from '../screens/registration/EnterMobileScreen';
import SideBar from '../screens/home/SideBar';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import OrderTab from '../screens/orders/OrderScreen';
import CodReconfirm from '../screens/orders/CodReconfirm';
// import GSTScreen from '../screens/gst/GSTScreen';
import GridViewList from '../screens/HOC/GridViewList'
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import OrdersDetailScreen from '../screens/orders/OrderDetailScreen';
// import LeadsDetailScreen from '../screens/orders/LeadsDetailScreen';
// import EnquiryDetailScreen from '../screens/orders/EnquiryDetailScreen';
// import CatlogsTab from '../screens/catlogs/CatlogsTab';
import ProductDetails from '../screens/productdetails/ProductDetails';
import GuestProductDetails from '../screens/productdetails/GuestProductDetails';
import SingleProductDetails from '../screens/productdetails/SingleProductDetails';
import BecomeSeller from '../screens/seller/BecomeSeller'
import MyBusiness from '../screens/mybussiness/MyBusiness';
// import DiscountSettings from '../screens/discountsettings/DiscountSettings';
// import AddCatalog from '../screens/addcatalogs/AddCatalog';
// import AddDesign from '../screens/addcatalogs/AddDesign';
// import RejectBuyers from '../screens/rejectbuyers/RejectBuyers';
// import AddBuyerGroup from '../screens/buyersgroup/AddBuyerGroup';
// import AddBuyerGroupDetails from '../screens/buyersgroup/AddBuyerGroupDetails';
// import BuyerGroups from '../screens/buyersgroup/BuyerGroups';
// import BuyersDetails from '../screens/buyersgroup/BuyersDetails';
// import RegisterNewUserScreen from '../screens/registration/RegisterNewUserScreen';
import MyBrands from '../screens/mybrands/MyBrands';
import AddBrand from '../screens/mybrands/AddBrand';
// import MyViewers from '../screens/myviewers/MyViewers';
// import MyViewersDetails from '../screens/myviewers/MyViewersDetails';
import ProductsImageViewer from '../screens/productdetails/ProductsImageViewer';
import MyWishlist from '../screens/wishlist/MyWishlist';
import MyCart from '../screens/cart/MyCart';
import ProductViewer from '../screens/cart/ProductViewer';
import Shipay from '../screens/shipay/Shipay';
// import InvoiceBreakup from '../screens/shipay/InvoiceBreakup';
import NotificationScreen from '../screens/notification/NotificationScreen';
import Products from '../screens/products/Products';
import MyFilters from '../screens/products/MyFilters';
import Filter from '../screens/products/filter/Filter';
import SearchScreen from '../screens/search/SearchScreen';
import WbMoneyScreen from '../screens/wbmoney/WbMoney';
import WbRewards from "../screens/wbmoney/WbRewards";
import Incentives from '../screens/wbmoney/Incentives';
import AddProductsStepOne from '../screens/products/add/Step1';
import AddProductsSearch from '../screens/products/add/CustomMultiSelectSearch';
import AddProductsStepTwoCatalog from '../screens/products/add/StepTwo';
import AddProductsStepTwoSet from '../screens/products/add/StepTwoSet';
import AddProductsParent from '../screens/products/add/AddProductsParent';
import MyProducts from '../screens/products/browse/MyProducts';
import MyProductsSet from '../screens/products/browse/MyProductsSet';
import MyProductsAddImages from '../screens/products/browse/MyProductsAddImages';
import AddToCart from '../screens/cart/AddToCart';
import SizedSelection from '../screens/cart/SizedSelection';
import SizedMultiSelection from '../screens/cart/SizedMultiSelection';
import SizedStartStopSelling from '../screens/seller/SizedStartStopSelling';
import PaymentModeModal from '../screens/shipay/PaymentModeModal';
// import ErrorHandlerPlayground from '../screens/errorHandler/ErrorHandlerPlayground';
// import NotifierTester from '../screens/notifierTester/NotifierTester';
import Cashfree from '../screens/cashfree/Cashfree';
import Brands from '../screens/brands/Brands';
import KycBank from '../screens/kycbank/KycBank';
import BankDetails from '../screens/bankdetails/BankDetails';
import ContactUs from '../screens/contactus/ContactUs';
import AboutUs from '../screens/aboutus/AboutUs';
import MyOrders from '../screens/orders/MyOrders';
import HowToSell from '../screens/resell/HowToSell';
import ResellPayouts from '../screens/resell/ResellPayouts';
import ResellPreferences from '../screens/resell/ResellPreferences';
import ResellAddresses from '../screens/resell/ResellAddresses';
import SharedByMe from '../screens/resell/SharedByMe';
import ShareCatalog from '../screens/resell/ShareCatalog';
import ChangeResaleAmount from '../screens/resell/ChangeResaleAmount'
import BrandedProducts from '../screens/brands/BrandedProducts';
import BrandedProductsPaginated from '../screens/brands/BrandedProductsPaginated';
import Leadquiry from '../screens/enquiry/Leadquiry';
import AddBrandsISell from "../screens/mybrands/AddBrandsISell";
import UpdateBillingAddress from "../screens/shipay/UpdateBillingAddress";
import AddressSelector from "../screens/shipay/AddressSelector";
import AddressEditor from "../screens/shipay/AddressEditor";
import ProductsPromotion from '../screens/products/browse/ProductsPromotion';
import MyDiscount from '../screens/discountsettings/MyDiscount';
import SetDiscount from '../screens/discountsettings/SetDiscount';
import DiscountBrandSelection from '../screens/discountsettings/DiscountBrandSelection';
import Test from '../screens/Test';

import GenericHeader from 'app/components/Header/GenericHeader';
import { colorresource } from 'app/resources/colorresource';
import { fontresource } from 'app/resources/fontresource';

const AuthStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
          header: () => null,
      }
    },
    VerifyotpScreen: {
      screen: VerifyotpScreen,
      navigationOptions: {
        header: () => null,
      }
    },
    ForgotOtpScreen:{
      screen: ForgotOtpScreen,
      navigationOptions: {
        header:() => null,
      }
    },
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

const StartupStack = createSwitchNavigator(
  {
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
          header: () => null,
          cardStyle: { paddingTop: StatusBar.setHidden(true) }
        }
      },

    AuthStack: {
      screen: AuthStack,
      navigationOptions: {
        header: () => null,
      }
    },
    LanguageScreen: {
        screen: LanguageScreen,
        navigationOptions: {
          header:() => null,
          headerTitle: strings('routes.select_language'),
        }
    },
    AppIntroScreen: {
        screen: AppIntroScreen,
        navigationOptions: {
          header: () => null,
        }
    },
    InitialRegistration: {
      screen: InitialRegistration,
      navigationOptions: {
        header: () => null,
      }
    },
    GuestProductDetailsScreen: {
      screen: GuestProductDetails,
      tionOptions: {
        header: () => null,
      },        
    },  
  },
  {
    initialRouteName: 'SplashScreen',
  }
);

  const MyCartStack = createStackNavigator({
    MyCart: {
      screen: MyCart,
      navigationOptions: {
        header: () => null,
        tabBarVisible: false
      }
    },
    Shipay: {
      screen: Shipay,
      navigationOptions: {
        header: () => null,
        tabBarVisible: false
      }
    },
    UpdateBillingAddress: {
      screen: UpdateBillingAddress,
      navigationOptions: {
        header: () => null,
        tabBarVisible: false
      }
    },
    ShipayModal: {
      screen: PaymentModeModal,
      navigationOptions: {
        header: () => null,
        tabBarVisible: false
      }
    },
    ChangeResaleAmount: {
      screen: ChangeResaleAmount,
      navigationOptions: {
        header: () => null,
        tabBarVisible: false
      }
    }
  },
  {
    initialRouteName: 'MyCart',
  })


  const ProductsTab = createStackNavigator(
    {
      ProductsPromotion: {
        screen: ProductsPromotion,
        navigationOptions: {
          header: () => null,
        }
      },
      UpdateBillingAddress: {
        screen: UpdateBillingAddress,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
    }
  );

  ProductsTab.navigationOptions = ({navigation}) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'ProductsPromotion') {
      navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
  }

  const OrdersTab = createStackNavigator({
    OrdersScreen: {
        screen: OrderTab,
        navigationOptions: {
            header: () => null,
        }
    },
    OrdersListScreen: {
        screen: OrdersListScreen,
        navigationOptions: {
            header: () => null,
            tabBarVisible: false,

        }
    },
    // LeadsDetailScreen: {
    //     screen: LeadsDetailScreen,
    //     navigationOptions: {
    //         header: () => null,
    //     }
    // },
    // EnquiryDetailScreen: {
    //     screen: EnquiryDetailScreen,
    //     navigationOptions: {
    //         header: () => null,
    //     }
    // },
  });

  OrdersTab.navigationOptions = ({navigation}) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'OrdersScreen') {
      navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
  }

  const AddProducts = createStackNavigator(
    {
      AddProductsParent: {
        screen: AddProductsParent
      },
      AddProductsStepOne: {
        screen: AddProductsStepOne
      },
      AddProductsSearch: {
        screen: AddProductsSearch
      },
      AddProductsStepTwoCatalog: {
        screen: AddProductsStepTwoCatalog
      },
      AddProductsStepTwoSet: {
        screen: AddProductsStepTwoSet
      }
    },
    {
      initialRouteName: 'AddProductsParent',
      headerMode: 'none',
    }
  )


const MyEarningsTab = createMaterialTopTabNavigator(
  {
    WbMoney: {
      screen: WbMoneyScreen,
      navigationOptions: {
        title: 'WB Money',
      }
    },
    WbRewards: {
      screen: WbRewards,
      navigationOptions: {
        title: 'WB Rewards',
      }
    },
    Incentives: {
      screen: Incentives,
      navigationOptions: {
        title: 'Incentives',
      }
    }
  },
  {
    navigationOptions: {
      headerTitle: 'My Earnings'
    },
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white',
        // color: 'white',
        // height: 5,
      },
      labelStyle: {
        fontFamily: fontresource.medium,
      },
      style: {
        backgroundColor: colorresource.liteblue,
      }
    },
    backBehavior: 'none',
  }
)

const MyEarnings = createStackNavigator(
  {
    MyEarningsTab: {
      screen: MyEarningsTab,
      navigationOptions: {
        header: <GenericHeader title='My Earnings' />,
        backBehavior: 'none',
        tabBarOptions: {
          indicatorStyle: {
            // backgroundColor: 'white',
            // color: 'white',
            height: 5,
          },
          style: {
            backgroundColor: colorresource.liteblue,
          }
        }
      }
    }
  }
)


const ResellTab = createMaterialTopTabNavigator(
  {
    ResellPayouts: {
      screen: ResellPayouts,
      navigationOptions: {
        title: 'Payouts',
      }
    },
    ResellAddresses: {
      screen: ResellAddresses,
      navigationOptions: {
        title: 'Customer Addresses',
      }
    },
    ResellPreferences: {
      screen: ResellPreferences,
      navigationOptions: {
        title: 'Preferences',
      }
    },
    SharedByMe: {
      screen: SharedByMe,
      navigationOptions: {
        title: 'Shared By Me',
      }
    },
  },
  {
    navigationOptions: {
      headerTitle: 'Reseller Hub'
    },
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white',
        // color: 'white',
        // height: 5,
      },
      labelStyle: {
        fontFamily: fontresource.medium,
      },
      style: {
        backgroundColor: colorresource.liteblue,
      }
    },
    backBehavior: 'none',
  }
)

const ResellerHub = createStackNavigator(
  {
    ResellTab: {
      screen: ResellTab,
      navigationOptions: {
        header: <GenericHeader title='Reseller Hub' />,
        backBehavior: 'none',
        tabBarOptions: {
          indicatorStyle: {
            // backgroundColor: 'white',
            // color: 'white',
            height: 5,
          },
          style: {
            backgroundColor: colorresource.liteblue,
          }
        }
      }
    }
  }
)

  const MyBusinessStack = createStackNavigator({
    MyBusiness: {
        screen: MyBusiness,
        navigationOptions: {
            header: () => null,
        }
    },
    // DiscountSettings: {
    //     screen: DiscountSettings,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    // MyViewers: {
    //     screen: MyViewers,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    AddCatalog: {
        // screen: AddCatalog, <---- commenting this, we have new implementation
        screen: AddProducts,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
    },
    // BuyerGroups: {
    //     screen: BuyerGroups,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    // GSTScreen: {
    //     screen: GSTScreen,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    // RegisterNewUserScreen: {
    //     screen: RegisterNewUserScreen,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    // RejectBuyers: {
    //     screen: RejectBuyers,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },

    // AddDesign: {
    //     screen: AddDesign,
    //     navigationOptions: {
    //       header: () => null,
    //       tabBarVisible: false
    //     }
    // },
    // AddBuyerGroup: {
    //     screen: AddBuyerGroup,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    // AddBuyerGroupDetails: {
    //     screen: AddBuyerGroupDetails,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    // MyViewersDetails: {
    //     screen: MyViewersDetails,
    //     navigationOptions: {
    //       header: () => null,
    //     }
    // },
    MyEarnings: {
      screen: MyEarnings,
      navigationOptions: {
        header: () => null,
      }
    },
    ResellerHub: {
      screen: ResellerHub,
      navigationOptions: {
        header: () => null,
      }
    }
  },
  {
    initialRouteName: 'MyBusiness',
  }
);

MyBusinessStack.navigationOptions = ({navigation}) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (routeName !== 'MyBusiness') {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
}

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: () => null,
      }
    },

    // CatlogsTab: {
    //   screen: CatlogsTab,
    //   navigationOptions: {
    //     header: () => null,
    //     tabBarVisible: false
    //   }
    // },

    AddToCart: {
      screen: AddToCart,
      navigationOptions: {
        header:() => null,
        tabBarVisible:false
      }
    },
  },
  {
    initialRouteName: 'Home'
  }
)

   HomeStack.navigationOptions = ({navigation}) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'Home') {
      navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
  }

  const TabStack = createBottomTabNavigator(
    {
      HomeScreen: { screen: HomeStack },
      ProductsTab: { screen: ProductsTab },
      OrdersTab: { screen: OrdersTab },
      MyBusinessStack: { screen: MyBusinessStack }
    },
    {
      tabBarPosition: "bottom",
      tabBarComponent: props => <TabScreenNavigator {...props} />,
      swipeEnabled: false,
      lazy:true,
      removeClippedSubviews:false,
      initialRouteName: 'HomeScreen',
      // backBehavior:initialRouteName
      animationEnabled: false,
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
        },
      }),
    }
  );

  const TabNavigation = createStackNavigator(
    {
      TabStack: { screen: TabStack },

    }, {
      headerMode: 'none',
    }
  );

const DrawerStack = createDrawerNavigator(
    {
      'Home': { screen: TabNavigation },
      'Categories': { screen: CategoriesScreen },
      'Resell & Earn': { screen: HowToSell},
      // 'Share App': { screen: ShareAppScreen },
      'Change Language': { screen: LanguageScreen },
      'Change Password': { screen: ChangePasswordScreen },
      'Profile': { screen: ProfileScreen },
      'Logout': { screen: HomeScreen },
      'Bank Details': { screen: BankDetails},
      'Contact Us': {screen: ContactUs},
      // 'Support Chat': { screen: HomeScreen },
      // 'FAQ': { screen: HomeScreen },
      'About Us': { screen: AboutUs },
    },
    {
      contentComponent: props => <SideBar {...props} />,
      // unmountInactiveRoutes: true
    }
  );

  const OpenStack = createStackNavigator(
    {
      MyCartStack: {
        screen: MyCartStack,
        navigationOptions: {
            header: () => null,
        }
      },
      MyWishlist: {
        screen: MyWishlist,
        navigationOptions: {
            header: () => null,
            tabBarVisible: false
        }
      },
      ProductDetails: {
        screen: ProductDetails,
        navigationOptions: {
          header: () => null,
        },
      },
      SingleProductDetails: {
        screen: SingleProductDetails,
        navigationOptions: {
          header: () => null,
        },
      },
      BecomeSeller: {
        screen: BecomeSeller,
        navigationOptions: {
          header: () => null,
        },
      },
      ProductsImageViewer:{
        screen: ProductsImageViewer,
        navigationOptions: {
          header: () => null,
        },

      },
      OrdersDetailScreen: {
        screen: OrdersDetailScreen,
        navigationOptions: {
          header: () =>null,
          tabBarVisible: false
        }
      },
      GridViewListScreen:{
        screen: GridViewList,
        navigationOptions: {
          header: () => null,
        },
      },
      RegistrationScreen:{
        screen:RegistrationScreen,
        navigationOptions:{
          header:() =>null
        }
      },
      // BuyersDetails: {
      //   screen: BuyersDetails,
      //   navigationOptions: {
      //     header: () => null,
      //   },
      // },
      NotificationScreen: {
        screen: NotificationScreen,
        navigationOptions: {
            header: () => null,
            tabBarVisible: false
        }
      },
      WebViewScreen:{
        screen:WebViewScreen,
        navigationOptions:{
          header:() => null,
          tabBarVisible:false
        }
      },
      Cashfree: {
        screen: Cashfree,
        navigationOptions: {
          tabBarVisible:false
        }
      },
      Brands: {
        screen: Brands,
        navigationOptions: {
          tabBarVisible:false
        }
      },
      BrandedProducts: {
        screen: BrandedProducts,
        navigationOptions: {
          tabBarVisible:false
        }
      },
      BrandedProductsPaginated: {
        screen: BrandedProductsPaginated,
        navigationOptions: {
          tabBarVisible:false
        }
      },
      KycBank: {
        screen: KycBank,
        navigationOptions: {
          tabBarVisible:false
        }
      },
      AddProducts: {
        screen: AddProducts,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
      MyBrands: {
        screen: MyBrands,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
      AddBrand: {
        screen: AddBrand,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
      AddBrandsISell: {
        screen: AddBrandsISell,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
      MyProducts: {
        screen: MyProducts,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
      MySetMatchingProducts: {
        screen: MyProductsSet,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        },
      },
      MyProductsAddImages: {
        screen: MyProductsAddImages,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        },
      },
      MyOrders: {
        screen: MyOrders,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        },
      },
      Leadquiry: {
        screen: Leadquiry,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        },
      },
      HowToSell: {
        screen: HowToSell,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        },
      },
      UpdateDeliveryAddress: {
        screen: AddressEditor,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
      SelectDeliveryAddress: {
        screen: AddressSelector,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },

      ProductsScreen: {
        screen: Products,
        navigationOptions: {
          header: () => null,
        }
      },

      MyFilters: {
        screen: MyFilters,
        navigationOptions: {
          header: () => null,
        }
      },

      SizedSelection: {
        screen: SizedSelection,
        navigationOptions: {
          header: () => null,
        }
      },

      SizedMultiSelection: {
        screen: SizedMultiSelection,
        navigationOptions: {
          header: () => null,
        }
      },

      SizedStartStopSelling: {
        screen: SizedStartStopSelling,
        navigationOptions: {
          header: () => null,
        }
      },

      FilterScreen: {
        screen: Filter,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false
        }
      },
      SearchScreen: {
        screen: SearchScreen,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false,
        }
      },
      MyDiscount: {
        screen: MyDiscount,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false,
        }
      },
      SetDiscount: {
        screen: SetDiscount,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false,
        }
      },
      DiscountBrandSelection: {
        screen: DiscountBrandSelection,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false,
        }
      },
      ShareCatalog: {
        screen: ShareCatalog,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false,
        }
      },
      ProductViewer: {
        screen: ProductViewer,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false,
        }
      },
      CodReconfirm: {
        screen: CodReconfirm,
        navigationOptions: {
          header: () => null,
          tabBarVisible: false,
        }
      },
    },
    {
      headerMode: 'none',
      //initialRouteName: 'BrandedProductsPaginated',
    }
  );

  const MainStack = createStackNavigator(
    {
      DrawerStack: { screen: DrawerStack },
      OpenStack:{screen: OpenStack}

    }, {
      headerMode: 'none',
    }
  );

const MainNavigator = createSwitchNavigator(
  {
    StartupStack: {
      screen: StartupStack,
    },
    MainStack: {
      screen: MainStack,
      navigationOptions: {
        header: () => null,
      }
    },
    DebugStack: Test,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.setHidden(false) },
    initialRouteName: 'StartupStack',
    // initialRouteName: 'DebugStack',
  },
);

export default createAppContainer(MainNavigator)
