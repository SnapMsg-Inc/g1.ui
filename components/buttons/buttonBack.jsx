import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colorWhite } from '../../styles/appColors/appColors';
import { useTheme } from '../color/themeContext';

function BackButton({ onPress }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme()
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        zIndex: 20,
        position: 'absolute',
        top: insets.top + 10,
        left: 20,
        backgroundColor: theme.backgroundColor,
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Feather name="chevron-left" color={theme.whiteColor} size={26} />
    </TouchableHighlight>
  );
}

export default BackButton;