import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Icon, Button } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import Modal from 'app/components/Modal/Modal';
import { formatDate } from 'app/utils/dateHelper';
import { colorresource } from 'app/resources/colorresource';

export default class PreLaunchModal extends Component{

  onDonePress = () => {
    if(this.state.modalVisible) {
      this.setState({modalVisible: false}, this.props.onDonePress)
    } else {
      this.props.onDonePress();
    }
  }

  setHideModal = () => {
    this.setState({modalVisible: false})
  }

  placeOrder = () => {
    console.log("[placeOrder]");
    const preLaunchCatalogs = this.props.cartDetails.filter((catalog => !catalog.ready_to_ship)).map(catalog => ({
      name: catalog.catalog_title,
      date: formatDate(catalog.dispatch_date, 'DD MMM YYYY')
    }))
    if(preLaunchCatalogs.length === 0) {
      console.log("[placeOrder] can go to shipay")
      this.onDonePress();
    } else {
      console.log("[placeOrder] ", {preLaunchCatalogs})
      this.setState({modalVisible: true, preLaunchCatalogs,})
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      preLaunchCatalogs: [],
      modalVisible: false,
    }
  }

  render() {
    return (
      <Modal 
      isVisible={this.state.modalVisible} 
      style={{flex:1, justifyContent: 'flex-end', margin: 0,}}
      onBackdropPress={this.setHideModal}
      >
        <View>
          <View style={styles.header}>
            <Icon name='close' type="MaterialCommunityIcons" style={{color: 'white', fontSize: 24}} onPress={this.setHideModal}/>
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>Pre-Launch Alert</Text>
          </View>
          <View style={{backgroundColor: colorresource.greybg, paddingBottom: 15}}>
            <Text style={styles.preLaunchNoteText}>Following products are on 'Pre-Launch'. They will be dispatched after they are available.</Text>
            <View style={styles.row}>
              <Text style={styles.columnHeading}>Product name</Text>
              <Text style={styles.columnHeading}>Availability</Text>
            </View>
          </View>
          
          <FlatList
          data={this.state.preLaunchCatalogs}
          renderItem={({item: catalog, index}) => {
            return (
              <View style={[styles.row, {paddingBottom: 7,}]}>
                <Text style={styles.name}>{`${index+1}. ${catalog.name}`}</Text>
                <Text style={styles.availability}>{catalog.date}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 15, backgroundColor: 'white',}}
          />
            
          <Button full style={{backgroundColor: colorresource.liteblue}} onPress={this.onDonePress}>
            <Text>Done</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

const padding = 16;

const styles = EStyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: colorresource.liteblue,
    alignItems: 'center',
    padding: 10,
  },
  preLaunchNoteText: {
    color: colorresource.liteblack, 
    fontSize: 14, 
    padding: 16,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingLeft: padding,
    paddingRight: padding,
    paddingTop: 5,
  },
  columnHeading: {
    color: colorresource.liteblack, 
    fontSize: 16, 
    fontWeight: 'bold',
  },
  name: {
    color: colorresource.gray,
    fontSize: 14,
  }, 
  availability: {
    color: colorresource.gray,
    fontSize: 14,
    fontWeight: 'bold',
  }
})