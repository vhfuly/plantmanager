import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import * as Notifications from 'expo-notifications';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { PlantsProps } from './src/libs/storage';
export default function App() {

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantsProps;
        console.log(data)
      }
    );
    return () => subscription.remove();

    // async function notification() {
    //   await Notifications.cancelAllScheduledNotificationsAsync();
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log('######Notificações agendadas########')
    //   console.log(data)
    // }

    // notification();
  })

  if (!fontsLoaded) 
    return <AppLoading />;

  return (
    <Routes />
  );
}
