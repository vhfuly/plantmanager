import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

import { Header } from '../components/Header';

import waterDrop from '../assets/waterdrop.png'
import colors from '../styles/colors';
import { FlatList } from 'react-native-gesture-handler';
import { PlantsProps, loadPlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {

  const [loading, setLoading] = useState(true);
  const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function LoadStorageData() {
      const plantsStorage= await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime}`
      )
      setMyPlants(plantsStorage)
      setLoading(false);
    }
    LoadStorageData();
  });

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={waterDrop}
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        < FlatList
          data={myPlants}
          keyExtractor= {(item) => String(item.id)}
          renderItem={ ({ item }) => (
            <PlantCardSecondary data={item} />
          )}

          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,

  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  }
})
