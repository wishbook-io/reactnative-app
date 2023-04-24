import React from 'react';
import {
  Platform, TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList, CheckBox, KeyboardAvoidingView
} from 'react-native';
import {  Container, Header, Body, Button, Icon, Left, Title, Subtitle, Right, Footer, Content, List, ListItem } from 'native-base';
import { HeaderBackNativeBase3 } from '../../components/Header';
import Radio from '../../components/Radio/Radio';

import ListViewWithSearch from '../../components/List/Listwithsearch.js';
import { colorresource } from '../../resources/colorresource';

const data = [{id:1,value:'Sarees'},{id:2,value:'Kurtis'},{id:3,value:'Dress Materials Unstitched'},
{id:4,value:'Lehengas'},{id:5,value:'Gown - Stitched'}];


export default class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [{ key: 'Category', count: 0 },{ key: 'Size', count: 0 },{ key: 'Stitch', count: 0 }, { key: 'Brand', count: 0 }, { key: 'Fabric', count: 0 }, { key: 'Work', count: 0 }, { key: 'Price', count: 0 }, { key: 'Catalog', count: 0 }],
            selectId: 0,
            selectCount: 0,
            selectedRadio: '',
            checked: false,
        };
    }
    _renderItemCheckboxFlatList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>{this.setState({ checked: !this.state.checked })}} style={{marginLeft:8}} >
                <View style={styles.row} key={index}>
                    <Text style={styles.text}>{item.value}</Text>
                    <CheckBox value={this.state.checked} onValueChange={()=>{this.setState({ checked: !this.state.checked })}}/>
                </View>
            </TouchableOpacity>
        );
      }

      _renderItemRadioFlatList = ({ item, index }) => {
        return (
            <TouchableOpacity  onPress={()=>{this.setState({ selectedRadio: item.id })}} style={{marginLeft:8}}>
                <View style={styles.row} key={index}>
                    <Text style={styles.text}>{item.value}</Text>
                    {(item.id === this.state.selectedRadio) ? (
                        <Radio selected={true}/>
                    ) : (
                        <Radio selected={false} />
                    )}
                </View>
            </TouchableOpacity>
        );
      }

      catagoryList() {
        const { selectId } = this.state;
        
        if(selectId === 0){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={false}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemRadioFlatList}
                />
            );
        }else if(selectId === 1){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={false}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemCheckboxFlatList}
                />
            );
        } else if(selectId === 2){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={false}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemRadioFlatList}
                />
            );
        } else if(selectId === 3){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={true}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemCheckboxFlatList}
                />
            );
        } else if(selectId === 4){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={true}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemCheckboxFlatList}
                />
            );
        } else if(selectId === 5){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={true}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemCheckboxFlatList}
                />
            );
        } else if(selectId === 6){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={false}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemCheckboxFlatList}
                />
            );
        } else if(selectId === 7){
            return (
                <ListViewWithSearch 
                    items= {data}
                    visibleSearch={true}
                    uniqueKey="id"
                    displayKey="value"
                    placeholder= "Search Brand"
                    renderItem={this._renderItemCheckboxFlatList}
                />
            );
        } else{
            return (<View><Text>Loading</Text></View>)
        }       
    }

  render() {
    const { selectId, selectCount } = this.state;
    return (
    <View style={{flex:1,flexDirection:'column'}}>
      
                <Header style={{ backgroundColor: '#fff',borderBottomWidth:1,borderBottomColor: 'black', }}>
                    <Left>
                        <Button transparent onPress={()=>{this.props.navigation.goBack()}}> 
                        <Icon style={{ color: '#0D80C1' }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#0D80C1', fontSize: 24 }}>Filter</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>{alert('clear')}}>
                        <Text style={{ color: '#0D80C1', fontSize: 17, fontWeight: 'bold' }}>CLEAR ALL</Text>
                        </Button>
                    </Right>
                </Header>

                <View style={{flex:8,flexDirection:"row"}}>
                    <View style={{flex:1.1, backgroundColor:'#f1f1f1'}}>
                        <FlatList 
                            data={this.state.data} 
                            renderItem={({ item, index }) => 
                                <TouchableOpacity style={{backgroundColor:(selectId === index)?'white':'#f1f1f1'}} onPress={()=>{this.setState({selectId: index})}} >
                                    <View style={styles.listContainer}>
                                    <Text style={[styles.list,{color:(selectId === index)?'#0D80C1':'black'}]}>{item.key}</Text>
                                    <Text style={{color:(selectId === index)?'#0D80C1':'black',marginTop:5}}>{(item.count === 0)?null: this.state.selectCount}</Text>
                                    </View>
                                </TouchableOpacity>} 
                            extraData={[]}/>
                    </View>
                    <View style={{flex:2, backgroundColor:'#fff'}}>
                        {this.catagoryList()}
                    </View>
                </View>
         
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1.1, backgroundColor:'#0D80C1'}}>
                        <Button transparent style={{width:'100%'}} >
                            <Text style={{ marginLeft:20, color: '#fff', fontSize: 16 }}>
                            SAVE FILTER
                            </Text>
                        </Button>
                    </View>
                    <View style={{flex:2, backgroundColor:'#fff'}}>
                        <Button transparent style={{width:'100%'}} >
                            <Text style={{ marginLeft:100, color: '#0D80C1', fontSize: 16 }}>
                                APPLY
                            </Text>
                        </Button>
                    </View>
                </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  navBar: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    width: '40%',
  },
  body: {
    flex: 3,
    display: 'flex',
  },
  footerButton: {
    justifyContent: 'center',
    backgroundColor: '#0D80C1'
  },
  listContainer: {flexDirection:'row',justifyContent: 'space-between', padding:15 },
  list: {
    fontSize: 18,
    marginRight: 18
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    width:'65%',
    color: colorresource.verydarkgray,
  },
});