import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '../../constants/styles';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
        { ...props }
        IconComponent={Ionicons}
        color={props.color ?? GlobalStyles.colors.blue}
        iconSize={23}
    />
  )
}

export default CustomHeaderButton
