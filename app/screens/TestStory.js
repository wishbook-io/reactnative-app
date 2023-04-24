import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import Svg,{
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

const cx = 100;
const cy = 100;
const radius = 50;

const N = 8;
data=Array.from(new Array(N),(val,index)=>index);

class StoryCircle extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Svg>
      {Array.from({length: this.props.size}, (item, index) => {

        const size = this.props.size;
        const stepDegree = 360/size;
        const offsetDegree = size == 1 ? 0 : 5
        const startDegree = index * stepDegree + offsetDegree;
        const endDegree = (index+1)*stepDegree - offsetDegree;
        const color = index < this.props.read ? 'grey' : 'blue';
        return (
        <Path
        key={index} 
        d={describeArc(radius,radius,radius, startDegree, endDegree)}
        fill="none"
        stroke={color}
        strokeWidth={3}
        />);
        } 
        )}
        </Svg>
    );
  }
}

export default class Test extends Component {
  
  constructor(props) {
    super(props);
    console.log(data);
  }
  render() {
    return (
      <View style={{flex: 1, borderWidth: 1, borderColor: 'red'}}>
        <View style={{flex:0.5, borderWidth: 1, borderColor: 'purple'}}>

        </View>

        <View style={{flex:0.5, borderWidth: 1, borderColor: 'yellow'}}>
          <StoryCircle size={5} read={2}/>
        </View>
        
      </View>
      );
    }
  }