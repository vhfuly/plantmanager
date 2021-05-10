import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';

import colors from '../styles/colors';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string],
  frequency: {
    times: number,
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [FilteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);
    if(environment == 'all') 
      return setFilteredPlants(plants);
    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    );
    setFilteredPlants(filtered);

  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments?_sort=title&oder=asc');
      setEnvironment([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ])
    }
    fetchEnvironment();
  },[]);


  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get('plants?_sort=name&oder=asc');
      setPlants(data)
    }
    fetchPlants();
  },[]);

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
      <Header/>

      <Text style={styles.title}>
        Em qual ambiente
      </Text>
      <Text style={styles.subtitle}>
        você quer colocar sua planta ? 
      </Text>
      </View>
      <View>
        <FlatList
          data={environment}
          renderItem= {({ item }) => (
            <EnvironmentButton 
              title={item.title} 
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={FilteredPlants}
          renderItem= {({ item }) => (
            <PlantCardPrimary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,

  },
  subtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    paddingRight: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})