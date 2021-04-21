import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';

export function UserIdentification() {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  😄 
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você ?
                </Text>
              </View>
              <TextInput 
                style={styles.input}
                placeholder='Digite seu Nome'
              />
              <View style={styles.footer}>
                <Button />
              </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form : {
    flex: 1,
    paddingHorizontal: 54,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  title :{
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  footer: {
    marginTop: 40,
    width:'100%',
    paddingHorizontal: 20,
  }
})

