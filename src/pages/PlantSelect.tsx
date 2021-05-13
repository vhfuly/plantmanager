import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import { PlantsProps } from '../libs/storage';
import colors from '../styles/colors';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Load } from '../components/Load';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { useNavigation } from '@react-navigation/native';

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [FilteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);
    if(environment == 'all') 
      return setFilteredPlants(plants);
    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    );
    setFilteredPlants(filtered);

  }

  async function fetchPlants() {
    const { data } = await api
    .get(`plants?_sort=name&oder=asc&_page=${page}&_limit=8`);
    if(!data)
      return setLoading(true);
    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if(distance < 1)
      return;
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1)
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantsProps) {
    navigation.navigate('PlantSave', plant)
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
    fetchPlants();
  },[]);

  if (loading)
    return <Load />
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
          keyExtractor={(item) => String(item.key)}
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
          keyExtractor={(item) => String(item.id)}
          renderItem= {({ item }) => (
            <PlantCardPrimary 
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent ={
            loadingMore
            ? <ActivityIndicator color={colors.green} />
            : <></>
          }
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