import React, { Component } from "react";
import { connect } from 'react-redux';
import { Platform, Dimensions, FlatList, View } from 'react-native';
import { Container, Header, Title, Content, Icon, Right, Picker, Item, Input, Text } from "native-base";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { HeaderBackNativeBase } from '../../components/Header';
import { EnquiryDetailsItemCard } from '../../components/OrderComponent';
import { strings } from '../../utils/i18n';
import styles from './styles';
import FlightData from './FlightData';
import { LayoutUtil } from '../categories/LayoutUtil';
let { height, width } = Dimensions.get('window');
import { Seperator } from '../../components/List';
import { colorresource } from '../../resources/colorresource';

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


class EnquiryDetailScreen extends Component {

    _menu = null;

    constructor(props) {
        super(props);
        const { picktype } = props.navigation.state.params;
        this.state = {
            selected1: picktype,
            dataProvider: FlightData,
            count: FlightData.length,
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
        };
    }

    _renderRow = ({ item }) => (
        <EnquiryDetailsItemCard />
    )

    goBack = () => {
        this.props.navigation.goBack()
    }

    onValueChange(value) {
        this.setState({
            selected1: value
        });
    }

    platfromSpecificPicker = () => Platform.select({
        ios: (<Picker
            style={styles.EnquiryDetailScreen_Dropdown}
            placeholder="Select"
            placeholderStyle={{ color: colorresource.black }}
            mode="dropdown"
            iosHeader={<Text style={{ color: colorresource.black }}>Select</Text>}
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="Closed" value="Closed" />
        </Picker>),
        android: (<Picker
            mode="dropdown"
            selectedValue={this.state.selected1}
            style={styles.EnquiryDetailScreen_Dropdown}
            onValueChange={(itemValue, itemIndex) => this.setState({ selected1: itemValue })}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="Closed" value="Closed" />
        </Picker>)
    });

    render() {
        return (
            <Container>
                <HeaderBackNativeBase title={strings('orders.leads')} onPress={this.goBack} />
                <View>
                    <Item style={styles.EnquiryDetailScreen_Itemview}>
                        {this.platfromSpecificPicker()}
                        <Right style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Icon name="search" type="MaterialIcons" style={styles.searchIcon} />
                        </Right>
                    </Item>
                    <Header searchBar rounded transparent>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" />
                            <Icon name="close" />
                        </Item>
                    </Header>
                   
                </View>
            </Container>
        );
    }
}


export default connect()(EnquiryDetailScreen);