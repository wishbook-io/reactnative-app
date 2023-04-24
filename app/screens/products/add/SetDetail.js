import React, { Component, PureComponent } from 'react';
import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { 
  Icon, 
  Text,
} from 'native-base';
import { TouchableRipple } from 'react-native-paper'
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';
import { TextInput as PTextInput, HelperText } from 'react-native-paper'
import _ from 'lodash';

import { showConfirm } from 'app/utils/notifier';
import { colorresource } from '../../../resources/colorresource';
import styles from './styles';
import { TestIdGenerator } from '../../../utils/TestingHelper';

// actions
import { isWeb } from 'app/utils/PlatformHelper';

const screenName = 'StepTwo';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

export default class SetDetail extends Component {

  // Sending updates to parent
  // params: { // the data for this set
  //   index: number, index for the setDetail that got changed
  //   design: its a string
  //   color: a string
  //   images: an array containing the paths of selected images
  //   live: number
  // } 
  onSetDetailChange = (update) => {
    // add index to params
    const params = {
      index: this.props.index,
      update,
    }
    this.props.onSetDetailChange(params)
  }

  onDesignTextChange = (text) => {
    this.onSetDetailChange({design: text});
  }

  onColorTextChange = (text) => {
    this.onSetDetailChange({color: text});
  }

  onImagesChange = (images) => {
    this.onSetDetailChange({images})
  }

  onLiveTextChange = (text) => {
    this.onSetDetailChange({live: text})
    this.setState({liveText: text});
  }

  onDeleteSetDetailPress = () => {
    this.props.onDeleteSetDetailPress(this.props.index);
  }

  onAddImagePress = async () => {
    console.log("[onAddImagePress]")
    const selectedImages = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    });
    console.log(selectedImages);
    /*
    [ { size: 157023,
        mime: 'image/png',
        height: 1920,
        width: 1080,
        modificationDate: '1543322861000',
        path: 'file:///data/user/0/com.wishbook.catalogone.sales/cache/react-native-image-crop-picker/Screenshot_20181127-124901.png' },
      { size: 101311,
        mime: 'image/png',
        height: 1920,
        width: 1080,
        modificationDate: '1543322861000',
        path: 'file:///data/user/0/com.wishbook.catalogone.sales/cache/react-native-image-crop-picker/Screenshot_20181127-110321.png' },
      { size: 544995,
        mime: 'image/png',
        height: 1920,
        width: 1080,
        modificationDate: '1543322861000',
        path: 'file:///data/user/0/com.wishbook.catalogone.sales/cache/react-native-image-crop-picker/Screenshot_20181122-171722.png' } ]

    */
   this.addImages(selectedImages.map((item)=>item.path))
  }

  addImages = (images) => {
    const updatedImages = [...this.props.data.images, ...images]
    this.onImagesChange(updatedImages);
  }

  deleteImage = (index) => {
    let updatedSelectedImages = _.cloneDeep(this.props.data.images)
    updatedSelectedImages.splice(index, 1);
    this.onImagesChange(updatedSelectedImages)
  }

  showImageDeleteConfirmation = (index) => {
    showConfirm(
      screenName,
      'Delete Product',
      'Are you sure you want to delete this product?',
      this.deleteImage,
      index
    )
  }

  onImageDeletePress = (index) => {
    console.log("[onImageDeletePress] index", index);
    this.showImageDeleteConfirmation(index);
  }

  render() {
    const testIds = this.props.testIds;
    return(
      <View style={localStyles.SetParent}>
        <View>
          <Text style={localStyles.SetHeading}>{'Set '+(this.props.index+1)+' Detail'}</Text>
          
          {this.props.index !== 0
          ? <View style={localStyles.SetImageDeleteParent}>
            <TouchableOpacity transparent style={localStyles.SetImageDelete} onPress={this.onDeleteSetDetailPress}>
              <Icon name='trash' style={localStyles.SetImageDeleteIcon}/>
            </TouchableOpacity>
          </View>
          : null }

        </View>
        <PTextInput
        style={{marginTop: 10}}
        label={'Enter Design name/number'}
        value={this.props.data.design}
        onChangeText={this.onDesignTextChange}
        {...testIds.design}
        />
        { this.props.showColor
          ? <PTextInput
          style={{marginTop: 10}}
          label={'Enter Color'}
          value={this.props.data.color}
          onChangeText={this.onColorTextChange}
          {...testIds.color}
          />
          : null }

        <View style={localStyles.SetAddParent}>
          <SetAddImage onAddImagePress={this.onAddImagePress} testId={testIds.addImages}/>
          {this.props.data.images.map((item,index) => <SetImage key={index} uri={item} onImageDeletePress={() => this.onImageDeletePress(index)}/>)}
        </View>

        <View style={styles.LiveRow}>
          <View>
            <Text style={styles.AddProductsSubHeading}>Keep live for</Text>
          </View>
          <View style={styles.LiveTextInputParent}>
            <TextInput
            keyboardType={'numeric'}
            maxLength={2}
            value={String(this.props.data.live)}
            style={styles.LiveTextInput}
            selectionColor={colorresource.liteblue}
            ref={this.registerLiveRef}
            onChangeText={this.onLiveTextChange}
            placeholder={'No. of days'}
            {...testIds.live}
            />
          </View>
          <View>
            <Text style={styles.AddProductsSubHeading}>days</Text>
          </View>
        </View>

      </View>
    );
  }
}

const SetAddImage = ({onAddImagePress, testId={}}) => {
  return(
    <View style={localStyles.SetImageFlexItem}>
      {/* <Button style={localStyles.SetAddImage} onPress={onAddImagePress} {...testId}>
        <Text uppercase={false} style={localStyles.SetAddImageText}>{'+ Add \nImages'}</Text>
      </Button> */}
      <TouchableRipple
      onPress={onAddImagePress}
      rippleColor={colorresource.liteblue}
      {...testId}
      >
        <View style={{
          borderWidth: 1, 
          borderColor: colorresource.liteblue,
          borderRadius: 5,
          justifyContent: 'center',
          // padding: 5,
          height: 90,
          width: 70,
        }}>
          <Text style={{
            color: colorresource.liteblue,
            textAlign: 'center',
            fontSize: 14,
          }}>{'+ Add \nImages'}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
}

const SetImage = ({uri, onImageDeletePress}) => {
  return (
    <View style={localStyles.SetImageFlexItem}>
      <View style={localStyles.SetImageParent}>
      <Image style={{flex: 1}} resizeMode={'contain'} source={{uri: uri}}/>
        <View style={localStyles.SetImageDeleteParent}>
          <TouchableOpacity transparent style={localStyles.SetImageDelete} onPress={onImageDeletePress}>
            <Icon name='trash' style={localStyles.SetImageDeleteIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const localStyles = EStyleSheet.create({
  SetParent: {
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  SetHeading: {
    fontSize: 18,
    color: colorresource.liteblack,
    marginLeft: -4,
  },
  SetAddParent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  SetImageFlexItem: {
    marginRight: 16,
    marginBottom: 16,
    // borderWidth: 1,
  },
  SetAddImage: {
    height: 90,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorresource.liteblue,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  SetAddImageText: {
    fontSize: 15,
    color: colorresource.liteblue,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
    flex: 1,
  },
  SetImageParent: {
    height: 90,
    width: 70,
    borderRadius: 5,
    backgroundColor: colorresource.materialbg,
  },
  SetImageDeleteParent: {
    position: 'absolute',
    right: 7,
    top: 5,

  },
  SetImageDelete: {

  },
  SetImageDeleteIcon: {
    color: colorresource.gray,
    fontSize: 25,
  },
});
