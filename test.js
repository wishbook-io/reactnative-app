import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView,Dimensions,TouchableHighlight,Alert } from 'react-native';
const {width = 0,height = 0} = Dimensions.get('window');



EnquiryDetailsCard = ({key,name, status, marginRight = 0}) => {
    return (
        <TouchableHighlight underlayColor={'transparent'}  onPress={()=>Alert.alert('hello')}>
        <View key={key} style={styles.Card}>
        <Image style ={{ width:width*0.2,height:height*0.12,alignSelf:'center',marginRight:height*0.01,marginLeft:height*0.01}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
        <View style={{width:width*0.7,flexDirection:'column'}}>
        <View style={{height:height*0.03,width:width*0.7,flexDirection:'row',justifyContent:'space-between'}}>
        <Text>Test</Text>
        <Text>15 Days ago</Text>
        </View>
        <View style={{height:height*0.03,flexDirection:'row'}}>
        <Text>Enquired about</Text>
        </View>
        <View style={{height:height*0.03,flexDirection:'row'}}>
        <Text>Status: Open</Text>
        </View>
        </View>
        </View>       

       </TouchableHighlight>
    );
  }

LeadsDeatailsCard = ({key,name, status, marginRight = 0}) => {
    return (
        <TouchableHighlight underlayColor={'transparent'}  onPress={()=>Alert.alert('hello')}>
        <View key={key} style={styles.Card}>
        <Image style ={{ width:width*0.2,height:height*0.12,alignSelf:'center',marginRight:height*0.01,marginLeft:height*0.01}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
        <View style={{width:width*0.7,flexDirection:'column'}}>
        <View style={{height:height*0.03,width:width*0.7,flexDirection:'row',justifyContent:'space-between'}}>
        <Text>Test</Text>
        <Text>15 Days ago</Text>
        </View>
        <View style={{height:height*0.03,flexDirection:'row'}}>
        <Text>Enquired about</Text>
        </View>
        <View style={{height:height*0.03,flexDirection:'row'}}>
        <Text>Status: Open</Text>
        </View>
        </View>
        </View>       

       </TouchableHighlight>
    );
  }


PurchaseSalesOrderDetailsCard = ({key,name, status, marginRight = 0}) => {
    return (
        <TouchableHighlight underlayColor={'transparent'} onPress={()=>Alert.alert('hello')}>
        <View key={key} style={[styles.Card,{flexDirection:'column',height:height*0.16}]}>
        <View style={{height:height*0.03,flexDirection:'row',justifyContent:'space-between'}}>
        <Text>Order #34224</Text>
        <Text>October 31 2018</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <Image style ={{ width:width*0.16,height:height*0.1,alignSelf:'center',marginRight:height*0.01,marginLeft:height*0.01}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
        <View style={{flexDirection:'column',width:width*0.7}}>  
        <View style={{flexDirection:'column'}}>
        <Text>Order Value</Text>
        <Text>200.0</Text>
        </View>
        <View style={{marginTop:height*0.01, width:width*0.5, flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
        <Text>Payment Status</Text>
        <Text>Paid</Text>
        </View>
        <View style={{flexDirection:'column'}}>
        <Text>Order Status</Text>
        <Text>Placed</Text>
        </View>
        </View>
        </View>
        </View>
        </View>       

       </TouchableHighlight>
    );
  }


class Orderdetails extends Component {
   state = {
      names: [
         {'name': 'Ben', 'id': 1},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5},
         {'name': 'Laura', 'id': 6},
         {'name': 'John', 'id': 7},
         {'name': 'Debra', 'id': 8},
         {'name': 'Aron', 'id': 9},
         {'name': 'Ann', 'id': 10},
         {'name': 'Steve', 'id': 11},
         {'name': 'Olivia', 'id': 12}
      ]
   }
   render() {
      return (
         <View>
            <ScrollView>
               {
                  this.state.names.map((item, index) => (
                     <PurchaseOrderDetailsCard
                     key={item.id}
                     name={item.name}
                     />
                  ))
               }
            </ScrollView>
         </View>
      )
   }
}
export default Orderdetails

const styles = StyleSheet.create ({
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   },
   Card: {
    alignSelf:'center',
    height:height*0.16,
    justifyContent:'center',
    width:width*0.96,
    flexDirection:'row',
    padding:height*0.02,
    elevation:2,
    backgroundColor:'white',
    marginBottom:height*0.02
  },
})