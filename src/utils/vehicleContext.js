import React, {createContext, useState} from 'react';
import {useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import getDataFromFirebase from "../utils/firebaseDb";
import JSON5 from "json5";
import PushNotification from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';

const VehicleContext = createContext({});

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));


const generateNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    title,
    message,
  });
};

const options = {
  taskName: 'firetruck',
  taskTitle: 'My Fire Truck',
  taskDesc: 'My Fire Truck Background Process',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  parameters: {
    delay: 2000,
  }
};

function VehicleContextProvider({children}) {
  const [vehicle, setVehicle] = useState();
  const [foam, setFoam] = useState();
  const [loading, setLoading] = useState();
  const [water, setWater] = useState();
  const [position, setPosition] = useState();
  const {Provider} = VehicleContext;
  const vehicles = useSelector(value => value.vehical);

  const veryIntensiveTask = async (args) => {
    await new Promise( async (resolve) => {
      addVehicleNotificationListeners();
      await sleep(args.delay);
    });


  };

  const notificationListenerSuccess = (res) => {
    if(typeof res === 'object'){
      const foam = parseData(res?.foam)
      const water = parseData(res?.water)
      if(foam?.message?.length > 0){
        generateNotification(`Foam Alert`, foam?.message)
      }
      if(water?.message?.length > 0){
        generateNotification(`Water Alert`, water?.message)
      }
    }
  }

  const addVehicleNotificationListeners = () => {
    if(vehicles?.vehicleList?.length) {
      vehicles?.vehicleList?.forEach(item => {
        getDataFromFirebase(`/${item.id}/`, notificationListenerSuccess, ()=>{});
      })
    }
  }

  const parseData = (data) => {
    try{
      return JSON5.parse(data);
    }catch (e) {

    }
  }

  const resetStates = () => {
    setFoam(null)
    setWater(null)
    setVehicle(null)
    setPosition(null)
  }

  const success = res => {
    setLoading(false);
    if(typeof res === 'object'){
      setFoam(parseData(res?.foam))
      setWater(parseData(res?.water))
      setVehicle(parseData(res?.vehicle))
      setPosition(res?.position)
    }else{
      resetStates()
    }
  };

  const error = res => {
    resetStates()
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if(vehicles?.selected?.id){
        setLoading(true);
        getDataFromFirebase(`/${vehicles.selected.id}/`, success, error);
      }else{
        resetStates()
      }
    }, [vehicles?.selected?.id])
  );

  const startBGService = async () => {
    if(BackgroundService.isRunning()){
      await BackgroundService.stop();
    }

    if(vehicles?.vehicleList?.length > 0){
      await BackgroundService.start(veryIntensiveTask, options);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      startBGService()
    }, [JSON.stringify(vehicles?.vehicleList)])
  );

  return <Provider value={{vehicle, foam, water, position, loading}}>{children}</Provider>;
}

export {VehicleContextProvider, VehicleContext};
