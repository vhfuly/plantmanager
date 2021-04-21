import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

// interface ButtonProps extends TouchableOpacityProps {
//   title: string;
// }

export function Button() {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>
        Confirmar
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    height: 56,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  }
})