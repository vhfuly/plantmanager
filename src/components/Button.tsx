import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 50,
    height: 56,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  }
})