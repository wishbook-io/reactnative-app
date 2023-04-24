import React, { Component } from 'react';
import { StyleSheet,View,Image,Text, Platform} from 'react-native';
import PropTypes from 'prop-types';

export default class UserAvatar extends Component {

    constructor(props){
        super(props);
        
    }

    render({ width, height, backgroundColor, color, text, fontWeight, fontSize } = this.props) {
        return (
                <View style={[styles.container,{width: width, height: height, borderRadius: width/2, backgroundColor: backgroundColor}]}>
                    <Text style={[styles.text,{color: color,fontWeight:fontWeight,fontSize:fontSize}]}>{text.charAt(0).toUpperCase()}</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        textAlign: 'center',
    }
});

UserAvatar.propTypes = {
    fontWeight: PropTypes.string,
    fontSize: PropTypes.number,
}

UserAvatar.defaultProps = {
    fontWeight:'normal',
    fontSize: 24,
}