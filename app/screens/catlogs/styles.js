import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const screenHeight = Dimensions.get('window').height / 2;
const screenWidth = Dimensions.get('window').width;


const styles = EStyleSheet.create({
  $ScreenHeight: screenHeight,
  $ScreenWidth: screenWidth,
  cardLeftText: {
    color: 'black', fontSize: 20
  },
  cardRightText: {
    color: colorresource.liteblue, fontSize: 20
  },
  seperatorView: {
    height: 2, marginLeft: 10, marginRight: 10
  },
  statusView: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5
  },
  cardItem: {
    flexDirection: 'column'
  },
  pendingTextPoints: {
    color: 'red', fontSize: 20
  },
  cardItemText: {
    color: colorresource.liteblue
  },
  openTextPoints: {
    color: 'green',
    fontSize: 20
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalContent: {
    height: '$ScreenHeight',
    width: '$ScreenWidth',
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalButton: {
    padding: 5, margin: 5, flexDirection: 'row', justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20
  },
  img: {
    height: 60,
    width: 60,
    marginLeft: 10
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  catlogcarditem: {
    height: 60,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    elevation: 5
  },
  catlogcardimage: {
    width: 60,
    height: 30
  },
  catlogcardtext: {
    marginLeft: 10,
    fontSize: 15
  },
  catlogflexone: {
    flex: 1
  },
  catlogscrollcarditem: {
    flexDirection: 'column', elevation: 3
  },
  catlogcarditemone: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  catlogcarditemcardtextone: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontSize: 15,
    padding: 2
  },
  catlogcarditemcardview: {
    flexDirection: 'row',
    padding: 5
  },
  catlogcarditemcardlefttext: {
    marginLeft: 2,
    fontSize: 13
  },
  catlogcarditemflexdirectionrow: {
    flexDirection: 'row'
  },
  catlogcarditemflexcolumn: {
    flexDirection: 'column'
  },
  catlogcarditemviewsecond: {
    marginLeft: 2,
    fontSize: 13,
    fontWeight: 'bold'
  },
  catlogcarditemcardStitched: {
    marginLeft: 4,
    fontSize: 13
  },
  catlogcarditemMaterialDetails: {
    marginLeft: 2, fontSize: 15
  },
  catlogcarditemseemoretext: {
    marginLeft: 2, fontSize: 10
  },
  catlogcarditemembroidry: {
    marginLeft: 5, fontSize: 13
  },
  catlogcarditemotherdetails: {
    marginLeft: 4,
    fontSize: 13,
    textAlign: 'left'
  },
  catlogcarditemleftsoldby: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  catlogfontsize: {
    fontSize: 11
  },
  catlogaligncenter: {
    alignItems: 'center'
  },
  catlogsellerrating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  catlogcarditemotherdetails: {
    marginLeft: 2,
    fontSize: 13,
    textAlign: 'right'
  },
  catlogmargin: {
    marginLeft: 5
  },

  catlogcarditemfont: {
    fontSize: 10
  },

  catlogcarditemlast: {
    marginLeft: 7, fontSize: 13
  },
  catlognodata: {
    textAlign: 'center', alignItems: 'center', margin: 5
  },
  catitemtop:{
    flex: 1, marginTop: 2, marginBottom: 2, height: 400 
  },
  catitemviewtop:{
    flexDirection:'column',padding: 5
  },
  catitemviewscd:{
    flexDirection:'row',alignSelf:'flex-end'
  },
  catitemviewimg:{
    height: 30,flex:0.2
  },
  catitemviewaftimg:{
    flexDirection: 'row',
     alignItems: 'center'
  },
  catitemthumbnail:{
    flex: .8, height: 70, marginLeft: 5
  },
  catitemthumbnailcoloumn:{
    flex: 2, flexDirection: 'column'
  },
  catitemrow:{
    flexDirection: 'row'
  },
  catitemcatlogrow:{
    marginLeft: 5, flexDirection: 'row'
  },
  catitemcatlogtext:{
    fontSize: 13, color: 'white' 
  },
  catitempricetext:{
    fontSize: 13, marginLeft: 5, color: 'white' 
  },
  catitempricesoldbytext:{
    fontSize: 13, fontWeight: 'bold', color: 'white'
  },
  catitempricetextsoldby:{
    fontSize: 13, marginLeft: 5, color: 'white'
  },
  catitemthumbnailheight:{
    height: 30
  },
  catitempriceview:{
    flexDirection: 'row', marginTop: 3
  },
  catlogstabtopview:{
    flexDirection: 'row', alignItems: 'center', padding: 5, margin: 5, backgroundColor: 'white'
  },
  catlogstab:{
    marginLeft: 5 
  },
  catlogstabtext:{
    marginLeft: 15, fontSize: 18 
  },
  catlogstabfont:{
    fontSize: 13 
  },
  catlogstab:{
    height: 1, backgroundColor: 'grey'
  },
  catlogstabwhite:{
    backgroundColor: 'white'
  },
  catlogstabviewtop:{
    height: 80, backgroundColor: 'white', justifyContent: 'center' 
  },
  catlogstabhandlepnpressview:{
    backgroundColor: 'white', height: 40, alignItems: 'center', justifyContent: 'center', marginLeft: 5 
  },
  catlogstabnodata:{
    textAlign: 'center' 
  },
  GridImagebutton:{
      flex: 1,
      margin: 1,
      backgroundColor: 'white'
  },
  GridImagetopview:{
    flex: 1,
    margin: 1,
  },
  GridImagefastimage:{
    flex: 1, margin: 10
  },
  Mycatalogtab:{
    height: 50, width: 210 
  },
  Mycatalogtabpicker:{
    height: 50, flexDirection: 'row', alignItems: 'center'
  },
  Mycatalogtabright:{
    marginEnd: 10, marginRight: 10 
  },
 Sharestatustopview:{
  flexDirection: 'row', alignItems: 'center'
 },
 Sharestatuscatname:{
  flex: 1.4, height: 180, margin: 5 
},
Sharestatuscatnameview:{
  flex: 2, flexDirection: 'column'
},
Sharestatuscatnametext:{
  marginLeft: 5, fontSize: 24, padding: 5
},
Sharestatuscatnamerow:{
  flexDirection: 'row'
},
Sharestatuscatnamedesigntext:{
  marginLeft: 5, fontSize: 14
},

Sharestatus:{
  flexDirection: 'row', marginTop: 3
},
Sharestatusfontsizefouteen:{
  fontSize: 14  
},

Sharestatusheight:{
  height: 30 
},
Sharestatusflex:{
  flex: 0.5
},


});

export default styles;
