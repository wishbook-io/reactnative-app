import React from 'react'
import { Card } from 'react-native-paper'
import EStyleSheet from 'react-native-extended-stylesheet'

import { colorresource } from 'app/resources/colorresource'
import styles from './styles'

export default WCard = ({
  onPress,
  cardStyle,
  contentStyle,
  children,
  bordered,
  noPadding,
}) => {

  return (
    <Card onPress={onPress} style={[styles.Card, bordered? localStyles.bordered: {}, cardStyle]}>
      <Card.Content style={[styles.CardContent, noPadding? localStyles.noPadding : {}, contentStyle]}>
        {children}
      </Card.Content>
    </Card>
  );
}

const localStyles = EStyleSheet.create({
  noPadding: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  bordered: {
    borderWidth: EStyleSheet.hairlineWidth,
    borderColor: colorresource.grey400,
  }
})