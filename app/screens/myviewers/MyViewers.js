
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Container } from 'native-base';
import { MyViewItem } from '../../components/MyViwerComponent';
import styles from './styles'
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';

const data = [
  {
    imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
    title1: "Ghh by *Colourful Cone Saree *Material:- Silk ",
    title2: "Viewed by None,Pheonix Trends & 1 other compaines"
  },
  {
    imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
    title1: "Ghh by *Colourful Cone Saree *Material:- Silk ",
    title2: "Viewed by None,Pheonix Trends & 1 other compaines"
  },
  {
    imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
    title1: "Ghh by *Colourful Cone Saree *Material:- Silk ",
    title2: "Viewed by None,Pheonix Trends & 1 other compaines"
  },
  {
    imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
    title1: "Ghh by *Colourful Cone Saree *Material:- Silk ",
    title2: "Viewed by None,Pheonix Trends & 1 other compaines"
  },
  {
    imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
    title1: "Ghh by *Colourful Cone Saree *Material:- Silk ",
    title2: "Viewed by None,Pheonix Trends & 1 other compaines"
  },
  {
    imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
    title1: "Ghh by *Colourful Cone Saree *Material:- Silk ",
    title2: "Viewed by None,Pheonix Trends & 1 other compaines"
  }

];

export default class MyViewers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  goViewerDetails = (rowData) => {
    this.props.navigation.navigate('MyViewersDetails', { rowData: rowData })
  }

  render() {
    return (
      <Container>
        <HeaderBackNativeBase title={strings('myviewer.my_viewers')} onPress={this.goBack} />
        <View style={styles.MyViewersTopview}>
          <FlatList
            data={this.state.data}
            renderItem={({ item: rowData }) =>
              (<MyViewItem rowData={rowData} onPress={() => {this.goViewerDetails(rowData) }} />)
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>
    );
  }
};

