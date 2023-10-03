import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

function BackButton({ onPress }) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        zIndex: 20,
        position: 'absolute',
        top: insets.top + 10,
        left: 20,
        backgroundColor: '#00000099',
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Feather name="chevron-left" color="white" size={26} />
    </TouchableHighlight>
  );
}

export default BackButton;