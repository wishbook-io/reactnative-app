import React, { Component } from 'react';
import { View, CameraRoll } from 'react-native';
import { Thumbnail, Text } from 'native-base';
import Share from 'react-native-share';
import RNFetchBlob from 'app/libs/RNFetchBlob';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'

import WButton from 'app/components/Button/WButton'
import Modal from 'react-native-modal'
import assets from 'app/utils/assetsObject'
import { isDroid, isIos } from 'app/utils/PlatformHelper';
import { colorresource } from 'app/resources/colorresource';

import { showToastAction } from 'app/actions/toast-actions';

const SESSION_NAME = 'Sharer';

export const SHARE_TYPE = {
  WHATSAPP: 'WHATSAPP',
  FACEBOOK: 'FACEBOOK',
  GALLERY: 'GALLERY',
  OTHER: 'OTHER',
}

const SHARE_TYPE_TO_SOCIAL = {
  [SHARE_TYPE.WHATSAPP]: Share.Social.WHATSAPP,
  [SHARE_TYPE.FACEBOOK]: Share.Social.FACEBOOK,
}

class Sharer extends Component {

  // public methods begin
  onOpen = ({showWhatsApp=false, onShareItemPressCallback}) => {
    console.log("OPEN")
    this.onShareItemPressCallback = onShareItemPressCallback
    this.setState({visible:true, showWhatsApp});
  }

  shareVia = (shareType, singlePcs) => {
    this.onShareItemPress(shareType, singlePcs)
  }
  // public methods end

  getAndroidNotifierConfig = (fileName) => {
    return ({
      addAndroidDownloads : {
        // Show notification when response data transmitted
        notification : true,
        // Title of download notification
        title : fileName,
        // File description (not notification description)
        description : 'Catalog saved',
        mime : 'image/jpeg',
        // Make the file scannable by media scanner
        mediaScannable : true,
      },
    })
  }

  downloadImagesSinglePcs = async (data, notify=true) => {
    // TODO: add progress indicator here
    // const indices = Object.keys(this.state.singlePcSelected).map(i => parseInt(i))
    // console.log(indices);
    // const data = this.props.data
    let paths = []
    await RNFetchBlob.session(SESSION_NAME).dispose()
    let dirs = RNFetchBlob.fs.dirs
    for(let i=0; i<data.length; ++i) {
      // const index = data[i];
      const catalog = data[i];
      const fileName = 'catalog' + catalog.id + '.jpg'
      const path = ((isDroid && notify)? dirs.DownloadDir : dirs.DocumentDir) + '/' + fileName;
      const res = await RNFetchBlob                                                                                                                                                                                                                                                                                                                                                                     
        .config({
          // fileCache: true,
          path,
          ...(notify? this.getAndroidNotifierConfig(fileName) : {session: SESSION_NAME}),
        })
        .fetch('GET', catalog.image.thumbnail_medium)
      paths[i] = res.path()
      if(isDroid) {
        paths[i] = 'file://' + paths[i]
      }
    }
    console.log("[downloadImagesSinglePcs]", paths);
    return paths
  }

  clearCacheFiles = async () => {
    await RNFetchBlob.session(SESSION_NAME).dispose()
  }

  openReactNativeShare = (urls, shareType) => {
    if(shareType === SHARE_TYPE.GALLERY) {
      if(isIos) {
        urls.forEach(url => 
          CameraRoll.saveToCameraRoll(url)
            .catch(error => console.log("[openReactNativeShare] saveToCameraRoll", error))
        )
      }
      return;
    }
    const social = SHARE_TYPE_TO_SOCIAL[shareType]
    if(isIos || !social) {
      Share.open({
        urls,
      }).catch(error => {
        console.log("[openReactNativeShare] Share.open", error);
      })
    } 
    else {
      Share.shareSingle({
        urls,
        social,
      }).catch(e => {
        this.props.dispatch(showToastAction('Couldn\'t open Share'))
      })
    }
  }

  downloadAndRetrievePaths = async (catalogs) => {
    catalogs = catalogs || this.props.getSelectedSinglePcs()
    if(!catalogs || catalogs.length === 0) {
      console.warn("[Sharer:onShareOnFacebookPress] no catalogs found")
      return;
    }

    const paths = await this.downloadImagesSinglePcs(catalogs)
    return paths;
  }

  onShareItemPress = async (shareType, catalogs) => {
    catalogs = catalogs || this.props.getSelectedSinglePcs()
    if(!catalogs || catalogs.length === 0) {
      console.warn("[Sharer:onShareItemPress] no catalogs found")
      return;
    }

    if(this.onShareItemPressCallback) {
      this.onShareItemPressCallback(shareType)
      this.onShareItemPressCallback = null;
    }
    const paths = await this.downloadAndRetrievePaths(catalogs)
    if(!paths) {
      return;
    }
    await this.hideShare()
    this.openReactNativeShare(paths, shareType)
  }

  onOtherPress = async () => {
    this.onShareItemPress(SHARE_TYPE.OTHER)
  }

  onSaveToGalleryPress = async () => {
    await this.onShareItemPress(SHARE_TYPE.GALLERY)
    this.props.dispatch(showToastAction('Successfully saved to Gallery'))
  }

  onShareOnFacebookPress = async () => {
    this.onShareItemPress(SHARE_TYPE.FACEBOOK)
  }

  onShareOnWhatsAppPress = async () => {
    this.onShareItemPress(SHARE_TYPE.WHATSAPP)
  }

  hideShare = async () => {
    // console.log("[Sharer:hideShare]")
    if(this.state.visible) {
      this.setState({visible:false});
      return new Promise(resolve => setTimeout(resolve, 1000))
    }
    return true
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showWhatsApp: false,
    }
  }

  render() {
    return (
      <Modal
      isVisible={this.state.visible}
      style={{
        margin: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      useNativeDriver={true}
      onBackdropPress={this.hideShare}
      >
        <View style={styles.modalParent}>

          {this.state.showWhatsApp?
            <WButton onPress={this.onShareOnWhatsAppPress}>
              <View style={styles.itemParent}>
                <View style={styles.iconParent}>
                  <Thumbnail square small source={assets['ic_whatsapp']} style={styles.icon}/>
                </View>
                <View style={styles.textParent}>
                  <Text style={styles.text}>Share on WhatsApp</Text>
                </View>
              </View>
            </WButton>
          : null }

          <WButton onPress={this.onShareOnFacebookPress}>
            <View style={styles.itemParent}>
              <View style={styles.iconParent}>
                <Thumbnail square small source={assets['ic_facebook']} style={styles.icon}/>
              </View>
              <View style={styles.textParent}>
                <Text style={styles.text}>Share on Facebook</Text>
              </View>
            </View>
          </WButton>

          <WButton onPress={this.onSaveToGalleryPress}>
            <View style={styles.itemParent}>
              <View style={styles.iconParent}>
                <Thumbnail square small source={assets['ic_gallery']} style={styles.icon}/>
              </View>
              <View style={styles.textParent}>
                <Text style={styles.text}>Save to Gallery</Text>
              </View>
            </View>
          </WButton>

          <WButton onPress={this.onOtherPress}>
            <View style={styles.itemParent}>
              <View style={styles.iconParent}>
                <Thumbnail square small source={assets['ic_shared_by_me']} style={styles.otherIcon}/>
              </View>
              <View style={styles.textParent}>
                <Text style={styles.text}>Other</Text>
              </View>
            </View>
          </WButton>

        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}

export default connect(mapStateToProps, null, null, { withRef: true })(Sharer)

const styles = EStyleSheet.create({
  modalParent: {
    backgroundColor: 'white', 
    padding: 10,
  },
  itemParent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  iconParent: {

  },
  icon: {
    height: 24,
    width: 24,
  },
  otherIcon: {
    height: 24,
    width: 24,
    tintColor: colorresource.gray,
  },
  textParent: {
    marginLeft: 25,
  },
  text: {
    fontSize: 14,
    color: colorresource.grey46,
  }
})