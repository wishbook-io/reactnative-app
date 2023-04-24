import React, { Component } from "react";
import { View, Dimensions, InteractionManager } from "react-native";
import { Container, Content } from "native-base";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

import { Seperator } from "app/components/List";
import { SideBarTextView } from 'app/components/Text'
import Logout from 'app/screens/logout/Logout';
import consts from "app/utils/const";
import UserHelper from 'app/config/userHelper';

import { goToFaqs, goToSupportChat} from 'app/actions/navigation-actions';

let { height, width } = Dimensions.get('window');

const drawerData = consts.HomeNavigationDrawer;

const ViewTypes = {
  NORMAL: 0,
  SEPERATOR: 1,
  BOLD: 2,
  LOGOUT: 3,
  RESELL: 4,
};

class SideBar extends Component {

  constructor(args) {
    super(args);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2
      }).cloneWithRows(drawerData.filter(i => !!i))
    };
    this._layoutProvider = new LayoutProvider((i) => {
      return this.state.dataProvider.getDataForIndex(i).type;
    }, (type, dim) => {
      switch (type) {
        case ViewTypes.NORMAL:
        case ViewTypes.LOGOUT:
          dim.width = width;
          dim.height = 50;
          break;
        case ViewTypes.SEPERATOR:
          dim.width = width;
          dim.height = 1;
          break;
        case ViewTypes.BOLD:
          dim.width = width;
          dim.height = 50;
          break;
        case ViewTypes.RESELL:
          dim.height = UserHelper.canUserResell()? 50 : 0;
          dim.width = width;
          break;
        default:
          dim.width = width;
          dim.height = 0;
      }
    });
    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow(type, data) {
    switch (type) {
      case ViewTypes.SEPERATOR:
        return <Seperator />
      case ViewTypes.NORMAL:
        return <SideBarTextView onPress={() => this.handlePress(data.values.title)} icon={data.values.icon} text={data.values.title} isBold={data.values.isBold} testId={data.values.testId}/>
      case ViewTypes.LOGOUT:
        return <SideBarTextView onPress={() => this.onLogoutPress()} icon={data.values.icon} text={data.values.title} isBold={data.values.isBold} testId={data.values.testId} />
      case ViewTypes.BOLD:
        return <SideBarTextView text={data.values.title} isBold={data.values.isBold} testId={data.values.testId}/>
      case ViewTypes.RESELL:
        return UserHelper.canUserResell()?
        <SideBarTextView 
        onPress={() => this.handlePress(data.values.title)} 
        icon={data.values.icon} 
        text={data.values.title} 
        isBold={data.values.isBold} 
        testId={data.values.testId}
        /> : null;
      default:
        return null;
    }
  }

  handlePress = (title) => {
    InteractionManager.runAfterInteractions(() => {

      if(title==="FAQ") {
        goToFaqs()
      }
      else if(title==="Support Chat") {
        goToSupportChat();
      }
      else {
        this.props.navigation.navigate(title)
      }
    })
  }
  
  onLogoutPress = () => {
    if(this.logoutRef) {
      this.logoutRef.logout();
    }
  }

  registerLogoutRef = (r) => {
    this.logoutRef = r && r.getWrappedInstance();
  }

  render() {
    return (
      <Container>
        <Content showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1}}>
            <RecyclerListView
              contentContainerStyle={{minHeight: height,marginTop:5 }}
              rowRenderer={this._renderRow}
              dataProvider={this.state.dataProvider}
              layoutProvider={this._layoutProvider} />
          </View>
        </Content>
        <Logout ref={this.registerLogoutRef}/>
      </Container>
    );
  }
}

export default SideBar;
