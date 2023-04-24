/**
 * Created by Yuvaraj on 6/23/17.
 */

const colorresource = {
  sharpred:             '#ef4738',
  red:                  '#DA4336',
  darkred:              '#e02b2b',
  litered:              '#e83309',
  drakskyblue:          '#007aff',
  liteblue:             '#0D80C1',
  skyblue:              '#3498db',
  blue:                 '#1291D1',
  btnblue:              '#0DA1D9',
  Vividblue:            '#14aaff',
  darkbluelite:         '#18628c',
  darkblue:             '#003f5b',
  grayblue:             '#003f5b',
  whatsapp_color_code:  '#34af23',
  green:                '#39AF39',
  darkgreen:            '#05721c',
  orange:               '#f2780c',
  yellow:               '#FFC515',
  white:                '#FFFFFF',
  greybg:               '#f1f1f1',
  Verylightgray:        '#f5f5f5',
  materialbg:           '#f6f6f6',
  grey50:               '#fafafa',
  cardshadow:           '#dddddd',
  verylitebrown:        '#d7d7d7',
  divider:              '#cecece',
  litegray:             '#c9c9c9',
  litebrown:            '#CCCCCC',
  grey400:              '#bdbdbd',
  litebrownsecond:      '#BCBCBC',
  darkgray:             '#999999',
  grey62:               '#9e9e9e',
  Darkgrayishblue:      '#94989A',
  Darkgrayishcyan:      '#848787',
  grey46:               '#757575',
  gray:                 '#777777',
  verydarkgraybrown:    '#797979',
  dimgray:              '#6c6c6c',
  Verydarkgrayishblue:  '#565759',
  thirdblack:           '#494949',
  liteblack:            '#3a3a3a',
  verydarkgray:         '#343434',
  grey900:              '#212121',
  black:                '#000',
  materialinputbg:      '#e7e7e7',
  materialinputtext:    '#161616',
  materialinputtextul:  'rgba(0,0,0,0.26)',
  materialinputhint:    '#535353',
  materialerror:        '#b00020',
}

function hashCode(key) {
  key += ''
  var hash = 0, i, chr;
  if (key.length === 0) return hash;
  for (i = 0; i < key.length; i++) {
    chr   = key.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const materialColors = [
  '#e57373',
  '#f06292',
  '#ba68c8',
  '#9575cd',
  '#7986cb',
  '#64b5f6',
  '#4fc3f7',
  '#4dd0e1',
  '#4db6ac',
  '#81c784',
  '#aed581',
  '#ff8a65',
  '#d4e157',
  '#ffd54f',
  '#ffb74d',
  '#a1887f',
  '#90a4ae'
]

function getRandomMaterialColor(key) {
  const size = materialColors.length
  if(!key) {
    return materialColors[Math.floor(Math.random() * size)];
  }
  const hash = hashCode(key)
  const mod = hash%size
  const index = mod < 0? mod + size : mod
  
  // console.log("key, index", {key, index})
  return materialColors[index]
}

export { colorresource, getRandomMaterialColor }