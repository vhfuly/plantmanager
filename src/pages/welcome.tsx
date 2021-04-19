import React, { useState } from 'react';
import { SafeAreaView, Text, Image, StyleSheet } from 'react-native';

import wateringImg from '../assets/watering.png'
import colors from '../../styles/colors';
import { Button } from '../components/Button';


export function Welcome() {
  const [visible, setVisible] = useState(false);

  function handleVisibility() {
    setVisible(!visible)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>
      {
        visible &&
        <Image source={wateringImg} style={styles.image}/>
      }
      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>
      <Button title='Imagem' onPress={handleVisibility}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 68,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign:'center',
    color: colors.heading,
  },
  subtitle: {
    fontSize: 18,
    textAlign:'center',
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    height: 284,
    width: 292,
  },
})

