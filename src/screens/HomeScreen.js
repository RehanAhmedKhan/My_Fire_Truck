import {FlatList, Alert, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import HomeCard from '../components/HomeCard';
import WrapperSafeAreaView from '../components/WrapperSafeAreaView';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from "react-redux";
import {VehicleContext} from "../utils/vehicleContext";
import Colors from "../consts/Colors";

const HomeScreen = () => {
  const vehicles = useSelector(value => value.vehical);
  const navigation = useNavigation();
  const { vehicle } = useContext(VehicleContext)
  const checkVehicle = (cb) => {
    if(vehicles?.selected?.id?.length > 0){
      cb();
    }else{
      Alert.alert(
        "No Vehicle Selected",
        "",
        [
          {
            text: "Later",
            onPress: () => {},
            style: "cancel"
          },
          { text: "Manage Vehicles", onPress: () => navigation.navigate('manageVehicalScreen') }
        ]
      );

    }
  }
  const cardValues = [
    {
      image: require('../../assets/icons/youtube.png'),
      cardMainText: 'Videos',
      // cardSubText: 'YouTube',
      onPress: () =>
        navigation.navigate('webViewScreen', {
          uri: 'https://www.youtube.com/playlist?list=PLsYYFDvs5dp9V1N4iJWs6UgHL9mnVR9uX',
        }),
    },
    {
      image: require('../../assets/icons/map.png'),
      cardMainText: 'Tracking',
      // cardSubText: 'Vehicle Location',
      onPress: () => checkVehicle(()=>navigation.navigate('mapViewScreen', {
        tracking: true
      })),
    },
    {
      image: require('../../assets/icons/route.png'),
      cardMainText: 'Route',
      // cardSubText: 'Vehicle Routes',
      onPress: () => checkVehicle(()=>navigation.navigate('mapViewScreen', {
        routing: true
      })),

    },
    {
      image: require('../../assets/icons/foam.png'),
      cardMainText: 'Foam Readings',
      // cardSubText: 'Foam Readings',
      onPress: () => checkVehicle(()=>navigation.navigate('liquideGuageScreen', { name: 'Foam'})),
    },
    {
      image: require('../../assets/icons/water.png'),
      cardMainText: 'Water Readings',
      // cardSubText: 'Water Readings',
      onPress: () => checkVehicle(()=>navigation.navigate('liquideGuageScreen', { name: 'Water'})),
    },
    {
      image: require('../../assets/icons/pdf.png'),
      cardMainText: 'Operation Manual',
      // cardSubText: 'PDF Viewer',
      onPress: () =>
        navigation.navigate('pdfViewerScreen', {
          uri: 'https://remo.pk/bestway/app/operation-manual.pdf',
        }),
    },
    {
      image: require('../../assets/icons/documents.png'),
      cardMainText: 'MSDS',
      // cardSubText: 'SDS',
      onPress: () =>
        navigation.navigate('webViewScreen', {
          uri: 'https://chemicalsafety.com/sds-search/',
        }),
    },
  ];

  return (
    <WrapperSafeAreaView
      pageTitle={'My Fire Truck'}
      pageIcon={require('../../assets/icons/filter.png')}
      onPress={() => navigation.navigate('manageVehicalScreen')}>
      <FlatList
        ListHeaderComponent={()=> {
          if(vehicle){
            return <>
              {
                !!vehicles?.selected?.name?.length && <Text numberOfLines={1} style={styles.vehicleName}>{vehicles?.selected?.name}</Text>
              }
              <Text numberOfLines={1} style={styles.vehicleName}>{vehicle?.number} {vehicle?.description?.length > 0 ? '-' : ''} {vehicle?.description}</Text>
            </>
          }
          if (!vehicles?.selected?.id)
            return <Text numberOfLines={1} style={styles.vehicleName}>No Vehicle Selected</Text>
          return <></>
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 8, paddingBottom: 15}}
        data={cardValues}
        numColumns={2}
        renderItem={({item}) => (
          <HomeCard
            image={item.image}
            cardMainText={item.cardMainText}
            cardSubText={item.cardSubText}
            onPress={()=>{
                item.onPress();
            }}
          />
        )}
      />
    </WrapperSafeAreaView>
  );
};

const styles = StyleSheet.create({
  vehicleName: {
    fontFamily: 'Poppins-Medium',
    color: Colors.mainText,
    width: '90%',
  }
})

export default HomeScreen;
