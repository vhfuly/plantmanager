import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png'
import colors from '../../styles/colors';

export function Welcome() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>
      
      <Image 
        source={wateringImg} 
        style={styles.image}
        resizeMode='contain'
      />
  
      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.7}
      >
        
        <Feather 
          name='chevron-right' 
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    marginTop: 38,
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
    height: Dimensions.get('window').width * 0.7,
  },
  button: {
    fontSize: 18,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  }
})

